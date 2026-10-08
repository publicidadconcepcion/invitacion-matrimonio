"""Read the local Invitados XLSX template. Python standard library only."""
import argparse, csv, json, posixpath, re, secrets, zipfile
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, urlencode
from xml.etree import ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data'
NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

def read_guests(source):
    with zipfile.ZipFile(source) as z:
        workbook = ET.fromstring(z.read('xl/workbook.xml'))
        sheet = next(s for s in workbook.findall('s:sheets/s:sheet', NS) if s.get('name') == 'Invitados')
        rid = sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
        rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        target = next(r.get('Target') for r in rels if r.get('Id') == rid)
        target = target.lstrip('/') if target.startswith('/') else posixpath.normpath('xl/' + target)
        strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            strings = [''.join(n.itertext()) for n in ET.fromstring(z.read('xl/sharedStrings.xml'))]
        rows = []
        for row in ET.fromstring(z.read(target)).findall('s:sheetData/s:row', NS):
            cells = {}
            for cell in row.findall('s:c', NS):
                if cell.find('s:f', NS) is not None:
                    raise ValueError('Usa valores, no formulas, en Invitados')
                value = cell.findtext('s:v', '', NS)
                if cell.get('t') == 's': value = strings[int(value)]
                elif cell.get('t') == 'inlineStr': value = ''.join(cell.find('s:is', NS).itertext())
                cells[re.sub(r'[0-9]', '', cell.get('r'))] = value.strip()
            if any(cells.values()): rows.append(cells)
        if not rows or rows[0].get('A') != 'ID invitado' or rows[0].get('B') != 'Nombre a mostrar':
            raise ValueError('Columnas A/B: ID invitado / Nombre a mostrar')
        result, seen = [], set()
        for row in rows[1:]:
            key, name = row.get('A',''), row.get('B','')
            if not key or key in seen or not name or len(name)>120 or name.startswith(('=','+','-','@')):
                raise ValueError('ID local vacio/duplicado o nombre invalido')
            seen.add(key); result.append((key,name))
        return result

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--excel', type=Path, default=DATA/'Plantilla_Invitados_Lucia_Gerald.xlsx')
    parser.add_argument('--base-url', default='https://publicidadconcepcion.github.io/invitacion-matrimonio/')
    args = parser.parse_args(); url = urlsplit(args.base_url)
    if url.scheme not in ('http','https') or not url.netloc or url.query or url.fragment or url.username:
        raise ValueError('Base URL absoluta sin query, fragmento ni credenciales')
    guests = read_guests(args.excel); DATA.mkdir(exist_ok=True)
    registry = DATA/'invitation-ids.json'
    ids = json.loads(registry.read_text(encoding='utf-8')) if registry.exists() else {}
    if len(set(ids.values())) != len(ids) or any(not re.fullmatch(r'[0-9a-f]{48}',v) for v in ids.values()):
        raise ValueError('Registro de identificadores invalido')
    rows = []
    for key,name in guests:
        if key not in ids:
            token = secrets.token_hex(24)
            while token in ids.values(): token = secrets.token_hex(24)
            ids[key] = token
        link = urlunsplit((url.scheme,url.netloc,url.path,urlencode({'invitado':ids[key]}),''))
        rows.append({'id':ids[key],'displayName':name,'active':'TRUE','link':link})
    temp = registry.with_suffix('.tmp'); temp.write_text(json.dumps(ids,indent=2),encoding='utf-8'); temp.replace(registry)
    with (DATA/'invitaciones.csv').open('w',newline='',encoding='utf-8-sig') as output:
        writer = csv.DictWriter(output,fieldnames=['id','displayName','active','link']); writer.writeheader(); writer.writerows(rows)
    print(f'{len(rows)} invitaciones en data/invitaciones.csv. Nada enviado a Google.')

if __name__ == '__main__': main()
