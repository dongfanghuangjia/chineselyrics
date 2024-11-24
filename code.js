var zhLyrics;
function bt_zhRead_change() {
    let zhLyrics = '';
    const fLyr = event.target.files[0];
    zhLyrics += fLyr.name.replace(".txt","").replace("_","-") + '||';
    if(fLyr != null) {
        const fReader = new FileReader();
        fReader.onload = function(event) {
            zhLyrics += event.target.result;
            navigator.clipboard.writeText(zhLyrics.replaceAll('\r\n', '|'));
            document.getElementById('dv_result').innerText = "Read file OK! Please paste to Google translate!";
            document.getElementById('dv_zhLyr').innerText = zhLyrics.replaceAll('\r\n', '|');
        }
        fReader.readAsText(fLyr);
    }
    else {
        zhLyrics = '';
    }
}

var pyLyrics;
async function bt_pyRead_click() {
    pyLyrics = await navigator.clipboard.readText();
    document.getElementById('dv_result').innerText = "Read clipboard text:\n" + pyLyrics;
    document.getElementById('dv_pyLyr').innerText = pyLyrics;
}

function bt_runCmd_click() {
    var zhOrgLyr, pyOrgLyr;
    zhOrgLyr = document.getElementById('dv_zhLyr').innerText;
    pyOrgLyr = gpinyin(document.getElementById('dv_pyLyr').innerText);
    var lyricsFull = '';
    var izh, ipy; izh = ipy = -1;
    var zhArrLyr = [];
    var pyArrLyr = [];
    while(zhOrgLyr.indexOf('|', izh+1) != -1) {
        var nzh, npy;
        nzh = zhOrgLyr.indexOf('|', izh+1);
        npy = pyOrgLyr.indexOf('|', ipy+1);
        zhArrLyr.push(zhOrgLyr.substring(izh+1, nzh-izh-1).trim()); // Loi tai vi tri cat 2 dau | lien tuc
        pyArrLyr.push(pyOrgLyr.substring(ipy+1, npy-ipy-1).trim());
        izh = nzh; ipy = npy;
    }
    nzh = (zhOrgLyr.indexOf('|', izh+1) != -1) ? zhOrgLyr.indexOf('|', izh+1) : zhOrgLyr.length;
    npy = (pyOrgLyr.indexOf('|', ipy+1) != -1) ? pyOrgLyr.indexOf('|', ipy+1) : pyOrgLyr.length;
    zhArrLyr.push(zhOrgLyr.substring(izh+1, nzh-izh-1).trim());
    pyArrLyr.push(pyOrgLyr.substring(ipy+1, npy-ipy-1).trim());
    for(i=0; i<zhArrLyr.length; i++) {
        lyricsFull += zhArrLyr[i] + '\n' + pyArrLyr[i] + '\n';
    }
    document.getElementById("dv_result").innerText = lyricsFull;
}

function bt_saveFile_click() {

}

// GOOGLE TRANSLATE FUNCTION SUPPORT
function str_proper(str) {
    var rstr = str.substr(0,1).toUpperCase();
    var capStr = false;
    for(i=1;i<str.length;i++) {
        if(str.substr(i-1,1) == ' ' || str.substr(i-1,1) == '(') capStr = true;
        if(capStr) {
            rstr += str.substr(i,1).toUpperCase();
            capStr = false;
        }
        else {
            rstr += str.substr(i,1).toLowerCase();
        }
    }
    return rstr;
}
function gpinyin(str) {
    let rstr = str.toLowerCase();
    // Split initials
    rstr = rstr.replaceAll('b',' b');
    rstr = rstr.replaceAll('p',' p');
    rstr = rstr.replaceAll('m',' m');
    rstr = rstr.replaceAll('f',' f');
    rstr = rstr.replaceAll('d',' d');
    rstr = rstr.replaceAll('t',' t');
    rstr = rstr.replaceAll('l',' l');
    rstr = rstr.replaceAll('k',' k');
    rstr = rstr.replaceAll('j',' j');
    rstr = rstr.replaceAll('q',' q');
    rstr = rstr.replaceAll('x',' x');
    rstr = rstr.replaceAll('z',' z');
    rstr = rstr.replaceAll('c',' c');
    rstr = rstr.replaceAll('s',' s');
    rstr = rstr.replaceAll('h',' h');
    rstr = rstr.replaceAll('y',' y');
    rstr = rstr.replaceAll('w',' w');
    // Fix zh, ch, sh initial
    rstr = rstr.replaceAll('z ','z');
    rstr = rstr.replaceAll('c ','c');
    rstr = rstr.replaceAll('s ','s');
    // Prepare any finals for n, g and r initial
    rstr = rstr.replaceAll('ang','aNG');
    rstr = rstr.replaceAll('an','aN');
    rstr = rstr.replaceAll('eng','eNG');
    rstr = rstr.replaceAll('en','eN');
    rstr = rstr.replaceAll('ong','oNG');
    rstr = rstr.replaceAll('ing','iNG');
    rstr = rstr.replaceAll('in','iN');
    rstr = rstr.replaceAll('un','uN');
    rstr = rstr.replaceAll('ün','üN');
    rstr = rstr.replaceAll('āng','āNG');
    rstr = rstr.replaceAll('ān','āN');
    rstr = rstr.replaceAll('ēng','ēNG');
    rstr = rstr.replaceAll('ēn','ēN');
    rstr = rstr.replaceAll('ōng','ōNG');
    rstr = rstr.replaceAll('īng','īNG');
    rstr = rstr.replaceAll('īn','īN');
    rstr = rstr.replaceAll('ūn','ūN');
    rstr = rstr.replaceAll('ǖn','ǖN');
    rstr = rstr.replaceAll('áng','áNG');
    rstr = rstr.replaceAll('án','áN');
    rstr = rstr.replaceAll('éng','éNG');
    rstr = rstr.replaceAll('én','éN');
    rstr = rstr.replaceAll('óng','óNG');
    rstr = rstr.replaceAll('íng','íNG');
    rstr = rstr.replaceAll('ín','íN');
    rstr = rstr.replaceAll('ún','úN');
    rstr = rstr.replaceAll('ǘn','ǘN');
    rstr = rstr.replaceAll('ǎng','ǎNG');
    rstr = rstr.replaceAll('ǎn','ǎN');
    rstr = rstr.replaceAll('ěng','ěNG');
    rstr = rstr.replaceAll('ěn','ěN');
    rstr = rstr.replaceAll('ǒng','ǒNG');
    rstr = rstr.replaceAll('ǐng','ǐNG');
    rstr = rstr.replaceAll('ǐn','ǐN');
    rstr = rstr.replaceAll('ǔn','ǔN');
    rstr = rstr.replaceAll('ǚn','ǚN');
    rstr = rstr.replaceAll('àng','àNG');
    rstr = rstr.replaceAll('àn','àN');
    rstr = rstr.replaceAll('èng','èNG');
    rstr = rstr.replaceAll('èn','èN');
    rstr = rstr.replaceAll('òng','òNG');
    rstr = rstr.replaceAll('ìng','ìNG');
    rstr = rstr.replaceAll('ìn','ìN');
    rstr = rstr.replaceAll('ùn','ùN');
    rstr = rstr.replaceAll('ǜn','ǜN');
    // Check n-bug
    for(var i=1;i<rstr.length-1;i++) {
        if(rstr.charAt(i)=='N' && checkfinals(rstr.charAt(i+1))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+1,rstr.length-i-1);
            rstr = r1 + 'n' + r2;
        }
    }
    // Check er-bug
    for(var i=1;i<rstr.length-1;i++) {
        if(rstr.charAt(i)=='r' && !checkfinals(rstr.charAt(i+1))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+1,rstr.length-i-1);
            rstr = r1 + 'R' + r2;
        }
    }
    if(rstr.charAt(rstr.length-1) == 'r') {
        rstr = rstr.substr(0,rstr.length - 1) + 'R';
    }
    // Check ng-bug
    for(var i=1;i<rstr.length-2;i++) {
        if(rstr.substr(i,2)=='NG' && checkfinals(rstr.charAt(i+2))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+2,rstr.length-i-2);
            rstr = r1 + 'Ng' + r2;
        }
    }
    // Split n, g, r initial
    rstr = rstr.replaceAll('n',' n');
    rstr = rstr.replaceAll('g',' g');
    rstr = rstr.replaceAll('r',' r');
    rstr = rstr.replaceAll('R','r');
    // Fix any finals of n, g and r
    rstr = rstr.replaceAll('aNG','ang');
    rstr = rstr.replaceAll('aN','an');
    rstr = rstr.replaceAll('eNG','eng');
    rstr = rstr.replaceAll('eN','en');
    rstr = rstr.replaceAll('eR','er');
    rstr = rstr.replaceAll('oNG','ong');
    rstr = rstr.replaceAll('iNG','ing');
    rstr = rstr.replaceAll('iN','in');
    rstr = rstr.replaceAll('uN','un');
    rstr = rstr.replaceAll('üN','ün');
    rstr = rstr.replaceAll('āNG','āng');
    rstr = rstr.replaceAll('āN','ān');
    rstr = rstr.replaceAll('ēNG','ēng');
    rstr = rstr.replaceAll('ēN','ēn');
    rstr = rstr.replaceAll('ēR','ēr');
    rstr = rstr.replaceAll('ōNG','ōng');
    rstr = rstr.replaceAll('īNG','īng');
    rstr = rstr.replaceAll('īN','īn');
    rstr = rstr.replaceAll('ūN','ūn');
    rstr = rstr.replaceAll('ǖN','ǖn');
    rstr = rstr.replaceAll('áNG','áng');
    rstr = rstr.replaceAll('áN','án');
    rstr = rstr.replaceAll('éNG','éng');
    rstr = rstr.replaceAll('éN','én');
    rstr = rstr.replaceAll('éR','ér');
    rstr = rstr.replaceAll('óNG','óng');
    rstr = rstr.replaceAll('íNG','íng');
    rstr = rstr.replaceAll('íN','ín');
    rstr = rstr.replaceAll('úN','ún');
    rstr = rstr.replaceAll('ǘN','ǘn');
    rstr = rstr.replaceAll('ǎNG','ǎng');
    rstr = rstr.replaceAll('ǎN','ǎn');
    rstr = rstr.replaceAll('ěNG','ěng');
    rstr = rstr.replaceAll('ěN','ěn');
    rstr = rstr.replaceAll('ěR','ěr');
    rstr = rstr.replaceAll('ǒNG','ǒng');
    rstr = rstr.replaceAll('ǐNG','ǐng');
    rstr = rstr.replaceAll('ǐN','ǐn');
    rstr = rstr.replaceAll('ǔN','ǔn');
    rstr = rstr.replaceAll('ǚN','ǚn');
    rstr = rstr.replaceAll('àNG','àng');
    rstr = rstr.replaceAll('àN','àn');
    rstr = rstr.replaceAll('èNG','èng');
    rstr = rstr.replaceAll('èN','èn');
    rstr = rstr.replaceAll('èR','èr');
    rstr = rstr.replaceAll('òNG','òng');
    rstr = rstr.replaceAll('ìNG','ìng');
    rstr = rstr.replaceAll('ìN','ìn');
    rstr = rstr.replaceAll('ùN','ùn');
    rstr = rstr.replaceAll('ǜN','ǜn');
    rstr = rstr.replaceAll(String.fromCharCode(0x27),' ');
    rstr = rstr.replaceAll('( ', '(');
    rstr = rstr.replaceAll('  ',' ');
    return rstr.trim();
}
const zhfinals = ['a','e','i','o','u','ü','ā','ē','ī','ō','ū','ǖ','á','é','ó','í','ú','ǘ',
    'ǎ','ě','ǐ','ǒ','ǔ','ǚ','à','è','ì','ò','ù','ǜ'];
function checkfinals(s) {
    let chkf = false;
    for(var i=0;i<zhfinals.length;i++) {
        if(s == zhfinals[i]) chkf = true;
    }
    return chkf;
}