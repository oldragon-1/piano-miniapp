"""MIDI解析工具 - 从MIDI文件提取简谱数据，输出到文件"""
import sys, os, json, requests, tempfile
from mido import MidiFile

def midi_to_jianpu(mn):
    return {0:1,2:2,4:3,5:4,7:5,9:6,11:7}.get((mn-60)%12, None)

def get_chord_name(notes):
    if not notes: return ''
    cm = {1:'C',2:'Dm',3:'Em',4:'F',5:'G',6:'Am'}
    r = min(notes)
    rj = midi_to_jianpu(r)
    return cm.get(rj, '')

def parse_midi(filepath, outpath):
    mid = MidiFile(filepath)
    tpb = mid.ticks_per_beat
    lines = [f"MIDI: {mid.type}格式, {len(mid.tracks)}音轨, TPB={tpb}"]
    
    for i, trk in enumerate(mid.tracks):
        nc = sum(1 for m in trk if m.type=='note_on')
        lines.append(f"  音轨{i}: '{trk.name}' ({len(trk)}事件, {nc}音符)")
    
    # 选音符最多的音轨
    best = max(range(len(mid.tracks)), key=lambda i: sum(1 for m in mid.tracks[i] if m.type=='note_on'))
    track = mid.tracks[best]
    lines.append(f"选择音轨{best}")
    
    # 解析
    cur = 0
    active = {}
    notes = []
    for msg in track:
        cur += msg.time
        if msg.type=='note_on' and msg.velocity>0:
            if msg.note in active:
                s = active.pop(msg.note)
                d = cur-s
                if d>0: notes.append({'n':msg.note,'s':s,'d':d})
            active[msg.note]=cur
        elif msg.type=='note_off' or (msg.type=='note_on' and msg.velocity==0):
            if msg.note in active:
                s = active.pop(msg.note)
                d = cur-s
                if d>0: notes.append({'n':msg.note,'s':s,'d':d})
    for n,s in active.items():
        d = cur-s
        if d>0: notes.append({'n':n,'s':s,'d':d})
    
    notes.sort(key=lambda x:x['s'])
    
    # 分组
    groups = []
    i = 0
    while i < len(notes):
        g = [notes[i]]
        j = i+1
        while j<len(notes) and abs(notes[j]['s']-notes[i]['s'])<tpb*0.1:
            g.append(notes[j])
            j+=1
        groups.append(g)
        i=j
    
    result = []
    for g in groups:
        mel = max(g, key=lambda x:x['n'])
        jp = midi_to_jianpu(mel['n'])
        if jp is None: continue
        if mel['n']<48 or mel['n']>72: continue
        dur = mel['d']/tpb
        if dur<0.2: continue
        dur = round(dur*2)/2
        if dur<0.5: dur=0.5
        
        cn = [x['n'] for x in g if x['n']<mel['n']]
        ch = get_chord_name(cn)
        
        result.append({'note':jp,'duration':dur,'chord':ch})
    
    lines.append(f"提取{len(result)}个音符\n")
    lines.append("===== JS格式输出 =====\n")
    for n in result:
        c = f", chord: '{n['chord']}'" if n['chord'] else ""
        lines.append(f"    {{note: {n['note']}, duration: {n['duration']}{c}}},")
    lines.append(f"\n// 共{len(result)}个音符")
    
    with open(outpath,'w',encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"输出到 {outpath}")

def download_midi(url, path):
    r = requests.get(url, timeout=30, headers={'User-Agent':'Mozilla/5.0'})
    with open(path,'wb') as f: f.write(r.content)
    return path

if __name__=='__main__':
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv)>2 else os.path.join(os.path.dirname(__file__),'midi_out.txt')
    if src.startswith('http'):
        tmp = os.path.join(tempfile.gettempdir(),'md.mid')
        download_midi(src,tmp)
        fp = tmp
    else:
        fp = src
    parse_midi(fp, out)
