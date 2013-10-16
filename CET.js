function fill(i, n) {
	i = i + "";
	l = i.length;
	if (n > l) {
		l = n - l;
		for (k = 0; k < l; k++) {
			i = "0" + i
		}
	}
	return i
}
function gid_iframe(id) {
	var doc;
	if (document.all) {
		doc = document.frames[id].document
	} else {
		doc = gid(id).contentDocument
	}
	return doc
}
var mycb = function() {
	var con = document.getElementById("content");
	var box2 = document.createElement("div");
	box2.setAttribute("id", "mybox2");
	con.parentNode.insertBefore(box2, con);
	var html = '<table>';
	html += '<tr><td style="width: 121px; text-align: right;"><label>姓 名</label>：</td><td><input type="text" id="name2" name="name2" value="" /><br />准确输入你姓名的前两个字，这是搜索成绩的关键一步</td></tr>';
	html += '<tr><td style="width: 121px; text-align: right;"><label>考场选择</label>：</td><td><select name="sroom" id="sroom"><option value="0">请选择考场...</option>';
	for (var i = 1; i <= 700; i++) {
		html += "
<option value='" + i + "'>" + i + "</option>
"
	};
	html += '</select>——<select name="eroom" id="eroom"><option value="0">请选择考场...</option>';
	for (var i = 1; i <= 700; i++) {
		html += "
	<option value='" + i + "'>" + i + "</option>"
	};
	html += '
</select> <br />
<span class="input-tip">都不选默认查询与准考号同一考场的，注：【选择范围决定成绩搜索时间】</span>
</td>
</tr>
<tr>
	<td style="width: 121px; text-align: right;"><label>座位选择</label>：</td>
	<td><select name="pos" id="pos"><option value="0">=座位号==</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
			<option value="19">19</option>
			<option value="20">20</option>
			<option value="21">21</option>
			<option value="22">22</option>
			<option value="23">23</option>
			<option value="24">24</option>
			<option value="25">25</option>
			<option value="26">26</option>
			<option value="27">27</option>
			<option value="28">28</option>
			<option value="29">29</option>
			<option value="30">30</option>
	</select><br /> <span class="input-tip">如果记得座位号，搜索速度将加快N倍！</span>
	</td>
</tr>
<tr>
	<td style="text-align: right;"><label>你周围考场的一个准考号</label>：</td>
	<td><input id="code" name="code" size="30" />
		<button id="query" onclick="query();">查询</button> <br /> <span
		class="input-tip">查询结果只显示姓名</span>
	</td>
</tr>
';
	html += '
</table>
';
	html += '
<style>
table {
	line-height: 24px
}
</style>
';
	html += '
<div style="display:none;" id="ret">
	<h2>查询结果</h2>
	<p style="">
		你正在使用<span style="color:orange;font-family:verdana;" id="codestr"></span>这个准考证号查询
		<!--|||<input type="button" onclick="exportit();" value="导出为Excel文件" id="export" />-->
	</p>
	<br />
	<div id="loading2">
		正在搜索你的成绩......<img src="images/wait.gif" /> <span
			style="font-size:120%;color:red;font-weight:bold;" id="process">0%</span>
	</div>
	<div id="report"></div>
	<div id="report_init" style="display:none;">
		<table id="rtbl" width="700" cellpadding=0 cellspacing=0>
			<tr>
				<th width="20%">准考证</th>
				<th width="20%">学校</th>
				<th width="10%">姓名</th>
				<th width="8%">听力</th>
				<th width="8%">阅读</th>
				<th width="8%">综合</th>
				<th width="8%">写作</th>
				<th width="20%"><span style="color:red;">总分</span>
				</th>
			</tr>
		</table>
	</div>
</div>
';
	html += '<iframe id="searchframe2" name="searchframe2" src="about:blank"
	style="display: none;" onload="javascript:ifrload2();"></iframe>';
	document.getElementById("mybox2").innerHTML = html;
	document.getElementById("searchform").setAttribute("target", "searchframe2")
};
var hasFind = false,
pos = 0,
sroom = 0,
eroom = 0,
c = 0,
rc = 0,
code = '';
function query() {
	hasFind = false;
	pos = document.getElementById("pos").value;
	sroom = parseInt(document.getElementById("sroom").value);
	eroom = parseInt(document.getElementById("eroom").value);
	n = document.getElementById("name2");
	if (n.value == '' || n.value == name_blank) {
		n.value = '';
		n.focus();
		alert('请先输入你姓名的前两个字！');
		return false
	}
	if (sroom > eroom || sroom == 0 || eroom == 0) {
		alert("请正确选择考场范围！");
		return false
	}
	min = 1;
	code = document.getElementById("code").value;
	if (code == '') {
		alert("请输入准考证号码！");
		return false
	}
	if (code.length < 10) {
		alert("请至少输入准考证号码的前10位！可参考底部关于准考证的说明");
		document.getElementById("code").focus();
		return false
	}
	if (sroom == 0 && eroom == 0) {
		s = code.substr(0, 13)
	} else {
		s = code.substr(0, 10) + fill(sroom, 3)
	}
	c = pos > 0 ? pos: 1;
	rc = sroom;
	last = s + c;
	document.getElementById("report").innerHTML = (document.getElementById("report_init").innerHTML);
	document.getElementById("ret").style.display = "block";
	document.getElementById("codestr").innerHTML = (code);
	document.getElementById("loading2").innerHTML = ('正在搜索你的成绩......<img
	src="images/wait.gif" /> <span
	style="font-size:120%;color:red;font-weight:bold;" id="process"></span>');
	document.getElementById("loading2").style.display = "block";
	document.getElementById("code").setAttribute("disabled", true);
	document.getElementById("sroom").setAttribute("disabled", true);
	document.getElementById("eroom").setAttribute("disabled", true);
	document.getElementById("name2").setAttribute("disabled", true);
	p(code)
}
function p(code) {
	if (hasFind) return;
	if (rc > eroom) {
		c = 0;
		document.getElementById("query").setAttribute("disabled", false);
		document.getElementById("code").setAttribute("disabled", false);
		document.getElementById("sroom").setAttribute("disabled", false);
		document.getElementById("eroom").setAttribute("disabled", false);
		document.getElementById("name2").setAttribute("disabled", false);
		document.getElementById("loading2").innerHTML = ("所选考场范围没有发现你。");
		return
	}
	s = code.substr(0, 10) + fill(rc, 3) + fill(c, 2);
	name = document.getElementById("name2").value;
	document.getElementById("name").value = (name);
	document.getElementById("id").value = (s);
	document.searchform.submit()
}
function ifrload2() {
	var doc = gid_iframe("searchframe2");
	score = doc.body.innerHTML;
	score = score.replace(/<.*?>/g, "");
	score = score.trim();
	if (score != "" && score.length > 7) {
		document.getElementById("process").innerHTML = ('100%');
		document.getElementById("loading2").innerHTML = ('<span
	style="color:red; font-size:18px;">恭喜，已经找到你的考试成绩！</span>');
		document.getElementById("query").setAttribute("disabled", false);
		document.getElementById("code").setAttribute("disabled", false);
		document.getElementById("sroom").setAttribute("disabled", false);
		document.getElementById("eroom").setAttribute("disabled", false);
		document.getElementById("name2").setAttribute("disabled", false);
		tmp = score.split(",");
		var ss = '';
		ss += '
<td align="center">' + s + '</td>
';
		ss += '
<td align="center">' + (tmp[6] ? tmp[6] : '--') + '</td>
';
		ss += '
<td align="center">' + (tmp[7] ? tmp[7] : '--') + '</td>
';
		ss += '
<td align="center">' + (tmp[1] ? tmp[1] : '--') + '</td>
';
		ss += '
<td align="center">' + (tmp[2] ? tmp[2] : '--') + '</td>
';
		ss += '
<td align="center">' + (tmp[3] ? tmp[3] : '--') + '</td>
';
		ss += '
<td align="center">' + (tmp[4] ? tmp[4] : '--') + '</td>
';
		ss += '
<td align="center">' + (tmp[5] ? tmp[5] : '--') + '</td>
';
		ss += '
</tr>
';
		document.getElementById("rtbl").innerHTML += (ss);
		rc = c = 1
	} else {
		if (score != "") {
			document.getElementById("process").innerHTML = ('
当前' + rc + '考场' + c + '座位');
			if (pos > 0) {
				c = pos;
				rc++
			} else {
				if (c >= 30) {
					c = 1;
					rc++
				} else {
					c++
				}
			}
			setTimeout("p(code)", 800)
		}
	}
}
mycb();
