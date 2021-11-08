const getViewState = require('../src/downloader/getViewState');

const response = `<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">

	<head>
		<title>Tribunal Regional Federal da 5&#170; Regi&#227;o - Di&#225;rio da Justi&#231;a Eletr&#244;nico</title>

		<meta content="IE=EmulateIE8" http-equiv="X-UA-Compatible" />

		<!-- #######
			IN&#239;&#191;&#189;CIO // Arquivos de estilo e comportamento do template 
		####### -->
		
		<link class="component" href="/diarioeletinternet/a4j/s/3_3_2.GAorg/richfaces/renderkit/html/css/basic_classes.xcss/DATB/eAF7sqpgb-jyGdIAFrMEaw__.faces" rel="stylesheet" type="text/css" /><link class="component" href="/diarioeletinternet/a4j/s/3_3_2.GAorg/richfaces/renderkit/html/css/extended_classes.xcss/DATB/eAF7sqpgb-jyGdIAFrMEaw__.faces" media="rich-extended-skinning" rel="stylesheet" type="text/css" /><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg.ajax4jsf.javascript.AjaxScript.faces" type="text/javascript"></script><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/ajax4jsf/javascript/scripts/form.js.faces" type="text/javascript"></script><link class="component" href="/diarioeletinternet/a4j/s/3_3_2.GAcss/table.xcss/DATB/eAF7sqpgb-jyGdIAFrMEaw__.faces" rel="stylesheet" type="text/css" /><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg.ajax4jsf.javascript.PrototypeScript.faces" type="text/javascript"></script><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/richfaces/renderkit/html/scripts/datascroller.js.faces" type="text/javascript"></script><link class="component" href="/diarioeletinternet/a4j/s/3_3_2.GAcss/datascroller.xcss/DATB/eAF7sqpgb-jyGdIAFrMEaw__.faces" rel="stylesheet" type="text/css" /><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/richfaces/renderkit/html/scripts/utils.js.faces" type="text/javascript"></script><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/richfaces/renderkit/html/scripts/browser_info.js.faces" type="text/javascript"></script><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/richfaces/renderkit/html/scripts/modalPanel.js.faces" type="text/javascript"></script><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/richfaces/renderkit/html/scripts/modalPanelBorders.js.faces" type="text/javascript"></script><link class="component" href="/diarioeletinternet/a4j/s/3_3_2.GAorg/richfaces/renderkit/html/css/modalPanel.xcss/DATB/eAF7sqpgb-jyGdIAFrMEaw__.faces" rel="stylesheet" type="text/css" /><script type="text/javascript">window.RICH_FACES_EXTENDED_SKINNING_ON=true;</script><script src="/diarioeletinternet/a4j/g/3_3_2.GAorg/richfaces/renderkit/html/scripts/skinning.js.faces" type="text/javascript"></script><link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/trf5.css" />  
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/menu.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/layout.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/link.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/formulario.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/tabela.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/nav-abas.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="/diarioeletinternet/css/datascroller.css" /> 
		
		<script type="text/JavaScript" src="/diarioeletinternet/js/menu-local.js"><!--

//--></script>
		<script type="text/JavaScript" src="/diarioeletinternet/js/sistema.js"><!--

//--></script>
		<script language="JavaScript" type="text/JavaScript" src="/diarioeletinternet/js/mascaras.js"><!--

//--></script>
		<!-- #######
			FIM // Arquivos de estilo e comportamento do template
		####### --><span id="j_id4"></span>
	</head>

	<body>
		<div id="wrapper">
			<div id="resolucao"><?xml version="1.0" encoding="ISO-8859-1"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:pm="http://stj.jus.br/componentes/pdawmenu" xml:lang="pt-br" lang="pt-br">		
	
	
	<div id="aui-3-2-0-17290" class="top aui-helper-clearfix">
        <ul id="aui-3-2-0-17290" class="aui-helper-clearfix top-nav">
            <li class="active ico-trf5"><a href="http://www.trf5.jus.br/" target="_BLANK">TRF5</a></li>
            <li><a href="http://www.jfal.jus.br/" target="_BLANK">JFAL</a></li>
            <li><a href="http://www.jfce.jus.br/" target="_BLANK">JFCE</a></li>
            <li><a href="http://www.jfpb.jus.br/" target="_BLANK">JFPB</a></li>
            <li><a href="http://www.jfpe.jus.br/" target="_BLANK">JFPE</a></li>
            <li><a href="http://www.jfrn.jus.br/" target="_BLANK">JFRN</a></li>
            <li><a href="http://www.jfse.jus.br/" target="_BLANK">JFSE</a></li>
           
            
        </ul>
        
        <!-- 
        <div class="top-acessibility">
            <a href="javascript:;" class="ico-font-plus"></a>
            <a href="javascript:;" class="ico-font-minus"></a>
            <a href="javascript:;" class="ico-contrast"></a>
			<a href="javascript:;" class="ico-redo"></a>
        </div>
         -->
        
    </div>

    <div class="trf-logo">
    	<a class="trf-logo-link" href="http://www.trf5.jus.br"></a>
	</div>
	<ul class="breadcrumbs">
		<li>
			<a href="/" title="Voltar P&#195;&#161;gina Principal" class="breadcrumbs-home breadcrumbs-entry"></a>
		</li>
		<li>
			<a class="breadcrumbs-entry">Processos</a>
			<a class="breadcrumbs-entry" href="/diarioeletinternet">Di&#225;rio da Justi&#231;a Eletr&#244;nico</a>
		</li>
		
	</ul>  
    <h2>Di&#225;rio Oficial Eletr&#244;nico da Justi&#231;a Federal da 5&#170; Regi&#227;o</h2>  
</html><?xml version="1.0" encoding="ISO-8859-1"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br"><form id="menuLocal" name="menuLocal" method="post" action="/diarioeletinternet/paginas/consultas/consultaDiario.faces" enctype="application/x-www-form-urlencoded">
	<div id="menu"> 
		<div id="menu-aplicativo"><input type="hidden" id="menuLocal:menuValor" name="menuLocal:menuValor" value="" /><ul id="menu"><li class="primeiro-item"><a id="link-menu-item1"><script type="text/javascript"><!--


	function oamSetHiddenInput(formname, name, value)
	{
		var form = document.forms[formname];
		if(typeof form.elements[name]=='undefined')
		{
			var newInput = document.createElement('input');
			newInput.setAttribute('type','hidden');
			newInput.setAttribute('id',name);
			newInput.setAttribute('name',name);
			newInput.setAttribute('value',value);
			form.appendChild(newInput);
		}
		else
		{
			form.elements[name].value=value;
		}
		
	}
	
	
	function oamClearHiddenInput(formname, name, value)
	{
		var form = document.forms[formname];
		if(typeof form.elements[name]!='undefined')
		{
			form.elements[name].value=null;
		}
		
	}
	
	function oamSubmitForm(formName, linkId, target, params)
	{
		
		var clearFn = 'clearFormHiddenParams_'+formName.replace(/-/g, '\$:').replace(/:/g,'_');
		if(typeof eval('window.'+clearFn)=='function')
		{
			eval('window.'+clearFn+'(formName)');
		}
		
		var oldTarget = '';
		if((typeof target=='function') && target != null)
		{
			oldTarget=document.forms[formName].target;
			document.forms[formName].target=target;
		}
		if((typeof params!='undefined') && params != null)
		{
			for(var i=0; i<params.length; i++)
			{
				oamSetHiddenInput(formName,params[i][0], params[i][1]);
			}
			
		}
		
		oamSetHiddenInput(formName,formName +':'+'_idcl',linkId);
		
		if(document.forms[formName].onsubmit)
		{
			var result=document.forms[formName].onsubmit();
			if((typeof result=='undefined')||result)
			{
				document.forms[formName].submit();
			}
			
		}
		else 
		{
			document.forms[formName].submit();
		}
		if(oldTarget==null) oldTarget='';
		document.forms[formName].target=oldTarget;
		if((typeof params!='undefined') && params != null)
		{
			for(var i=0; i<params.length; i++)
			{
				oamClearHiddenInput(formName,params[i][0], params[i][1]);
			}
			
		}
		
		oamClearHiddenInput(formName,formName +':'+'_idcl',linkId);return false;
	}
	

//--></script><a href="#" onclick="return oamSubmitForm('menuLocal','menuLocal:j_id11');" title="">Edicoes Publicadas</a></li><li><a id="link-menu-item2"><a href="#" onclick="return oamSubmitForm('menuLocal','menuLocal:j_id12');" title="">Materias Publicadas</a></li>
					
				<ul id="menu">			
					<li class="primeiro-item" style="border-top: 1px solid #10283A;">
						<a target="_blank;" title="Validar Assinatura" href="http://www.trf5.jus.br/validar_assinatura">Validar Assinatura</a>
					</li>
				</ul></ul>
		</div>
	</div><input type="hidden" name="menuLocal_SUBMIT" value="1" /><input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAN0AAVqX2lkMnB0ACcvcGFnaW5hcy9jb25zdWx0YXMvY29uc3VsdGFEaWFyaW8ueGh0bWw=" /></form>
</html>
				<div id="separador"></div><?xml version="1.0" encoding="ISO-8859-1"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">
	
	<div id="corpo">
		
		<!--  <h2 class="noprint">
			<ui:insert name="titulo"></ui:insert>
		</h2>
		--><form id="frmVisao" name="frmVisao" method="post" action="/diarioeletinternet/paginas/consultas/consultaDiario.faces">
		
		<!--<h3>Institu&#239;&#191;&#189;do pela Resolu&#239;&#191;&#189;&#239;&#191;&#189;o n&#239;&#191;&#189; 029/2011</h3>
					<p>
					Institu&#239;&#191;&#189;do pela <a href="http://www.trf5.jus.br/documento/?arquivo=RES.19.2009.pdf&amp;tipo=res">Resolu&#239;&#191;&#189;&#239;&#191;&#189;o n&#239;&#191;&#189; 029/2011</a>, 
					como meio oficial de publica&#239;&#191;&#189;&#239;&#191;&#189;o dos atos judiciais e administrativos. 
					</p>
					<br/><br/>
			-->
			
					<p>
						<h3>Institu&#237;do pela Resolu&#231;&#227;o n&#186;  <a href="http://www.trf5.jus.br/documento/?arquivo=RESOLU%C7%C3O+N%BA+29+DE+26+DE+OUTUBRO+DE+2011.pdf&amp;tipo=res" target="_blank;">029/2011</a> , como meio oficial de publica&#231;&#227;o de mat&#233;rias judiciais e administrativos.</h3>
					</p>
					<br /><br />
				<table class="form-table">
				<tbody> 
					<tr>
						<td width="30%"><span class="form-campo-obrigatorio" title="Campo de preenchimento obrigat&#243;rio">*</span><label class="form-label-primario" for="form-text">&#211;rg&#227;o<br /><select id="frmVisao:orgao" name="frmVisao:orgao" size="1" class="form-text">	<option value="">Selecione</option>	<option value="5">TRIBUNAL REGIONAL FEDERAL DA 5&#170; REGI&#195;O</option>	<option value="80">Se&#231;&#227;o Judici&#225;ria de Alagoas</option>	<option value="81">Se&#231;&#227;o Judici&#225;ria do Cear&#225;</option>	<option value="82">Se&#231;&#227;o Judici&#225;ria da Para&#237;ba</option>	<option value="83">Se&#231;&#227;o Judici&#225;ria de Pernambuco</option>	<option value="84">Se&#231;&#227;o Judici&#225;ria do Rio Grande do Norte</option>	<option value="85">Se&#231;&#227;o Judici&#225;ria do Sergipe</option></select></label></td>
						<td width="70%"></td>
					</tr>
					<tr>
						<td>
						<table>
						<tr>
						
						<td><span class="form-campo-obrigatorio" title="Campo de preenchimento obrigat&#243;rio">*</span><label class="form-label-primario" for="form-text">Edi&#231;&#227;o<br /><select id="frmVisao:edicao" name="frmVisao:edicao" size="1" class="form-text" onchange="atuPeriodo();">	<option value="" selected="selected">Selecione</option>	<option value="1">Judicial</option>	<option value="2">Administrativo</option></select></label> </td> 
						
						<td><label class="form-label-primario" for="form-text">Ano<br /><script id="frmVisao:j_id39" type="text/javascript"><!--
//<![CDATA[
		atuMeses=function(){A4J.AJAX.Submit('frmVisao',null,{'similarityGroupingId':'frmVisao:j_id39','parameters':{'frmVisao:j_id39':'frmVisao:j_id39'} } )};
		//]]>
//--></script><select id="frmVisao:periodo" name="frmVisao:periodo" size="1" class="form-text" onchange="atuMeses();">	<option value="" selected="selected">Selecione</option>	<option value="2009">2009</option>	<option value="2010">2010</option>	<option value="2011">2011</option>	<option value="2012">2012</option>	<option value="2013">2013</option>	<option value="2014">2014</option>	<option value="2015">2015</option>	<option value="2016">2016</option>	<option value="2017">2017</option>	<option value="2018">2018</option>	<option value="2019">2019</option>	<option value="2020">2020</option>	<option value="2021">2021</option></select></label></td>
						
						<td><label class="form-label-primario" for="form-text">M&#234;s<br /><select id="frmVisao:meses" name="frmVisao:meses" size="1" class="form-text">	<option value="" selected="selected">Selecione</option></select></label></td>
						</tr>
						</table>
						
						</td>
								
					</tr>
					<tr>
						<td></td>
					</tr>
				</tbody>
			</table>

			<div class="form-barra-botoes"><input id="frmVisao:j_id45" name="frmVisao:j_id45" type="submit" value="Pesquisar" onclick="document.getElementById('j_id93:mpEspere').component.show();;if(typeof window.clearFormHiddenParams_frmVisao=='function'){clearFormHiddenParams_frmVisao('frmVisao');}" class="form-button-p01" /><input id="frmVisao:j_id47" name="frmVisao:j_id47" type="submit" value="Limpar " onclick="if(typeof window.clearFormHiddenParams_frmVisao=='function'){clearFormHiddenParams_frmVisao('frmVisao');}" class="form-button-p01" />
			</div>
			<br /><input type="hidden" autocomplete="off" name="frmVisao" value="frmVisao" /><input type="hidden" autocomplete="off" name="autoScroll" value="" /><input type="hidden" autocomplete="off" name="frmVisao:_link_hidden_" value="" /><input type="hidden" autocomplete="off" name="frmVisao:j_idcl" value="" /><input type="hidden" autocomplete="off" name="frmVisao:_idcl" value="" /><script type="text/javascript"><!--
function clear_frmVisao() {
_clearJSFFormParameters('frmVisao','',['frmVisao:_link_hidden_','frmVisao:j_idcl','frmVisao:_idcl']);
}
function clearFormHiddenParams_frmVisao(){clear_frmVisao();}
function clearFormHiddenParams_frmVisao(){clear_frmVisao();}
clear_frmVisao();
//--></script><input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAN0AAVqX2lkMnB0ACcvcGFnaW5hcy9jb25zdWx0YXMvY29uc3VsdGFEaWFyaW8ueGh0bWw=" /></form><form id="frmPesquisa" name="frmPesquisa" method="post" target="_blank" action="/diarioeletinternet/paginas/consultas/consultaDiario.faces"><input type="hidden" autocomplete="off" name="frmPesquisa" value="frmPesquisa" /><input type="hidden" autocomplete="off" name="autoScroll" value="" /><input type="hidden" autocomplete="off" name="frmPesquisa:j_idcl" value="" /><input type="hidden" autocomplete="off" name="frmPesquisa:_link_hidden_" value="" /><script type="text/javascript"><!--
function clear_frmPesquisa() {
_clearJSFFormParameters('frmPesquisa','_blank',['frmPesquisa:j_idcl','frmPesquisa:_link_hidden_']);
}
function clearFormHiddenParams_frmPesquisa(){clear_frmPesquisa();}
function clearFormHiddenParams_frmPesquisa(){clear_frmPesquisa();}
clear_frmPesquisa();
//--></script><input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAN0AAVqX2lkMnB0ACcvcGFnaW5hcy9jb25zdWx0YXMvY29uc3VsdGFEaWFyaW8ueGh0bWw=" /></form>
		
		<!-- Modal Espera Consulta --><form id="j_id93" name="j_id93" method="post" action="/diarioeletinternet/paginas/consultas/consultaDiario.faces"><div id="j_id93:mpEspere" style="display: none;"><input autocomplete="off" id="j_id93:mpEspereOpenedState" name="j_id93:mpEspereOpenedState" type="hidden" /><div class="rich-modalpanel " id="j_id93:mpEspereContainer" style="position: absolute; display: none; z-index: 100; background-color: inherit;"><div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="j_id93:mpEspereDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="j_id93:mpEspereFirstHref"></button></div><div class="rich-mpnl_panel"><div class="rich-mp-container" id="j_id93:mpEspereCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;"><div class="rich-mpnl-shadow" id="j_id93:mpEspereShadowDiv"></div><div class=" rich-mpnl-content" id="j_id93:mpEspereContentDiv"><table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="j_id93:mpEspereContentTable" style="width: 1px;height: 1px;"><tr style="height: 99%"><td class="rich-mpnl-body" valign="top">
				<center><table><tbody><tr><td><img src="/diarioeletinternet/img/carregando.gif" style="border:none;" /></td></tr>
<tr><td><img alt="" class="rich-spacer " height="1" id="j_id93:j_id97" src="/diarioeletinternet/a4j/g/3_3_2.GAimages/spacer.gif.faces" width="20" /></td></tr>
<tr><td>Aguarde...</td></tr>
</tbody></table>   
				</center></td></tr></table></div></div></div><div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="j_id93:mpEspereCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="j_id93:mpEspereLastHref"></button></div><script type="text/javascript"><!--
new ModalPanel('j_id93:mpEspere',
				{
					width: -1,
					height: -1,

					minWidth: -1,
					minHeight: -1,

					resizeable: false,
					moveable: true,

					left: "auto",
					top: "auto",

					zindex: 100,onresize: '',onmove: '',onshow: '',onhide: '',onbeforeshow: '',onbeforehide: '',
					domElementAttachment: "",				
					keepVisualState: false,
					showWhenRendered: false,
					selectBehavior: "disable",

					autosized: true,
					overlapEmbedObjects: false});
//--></script></div><script type="text/javascript"><!--

//--></script></div><input type="hidden" autocomplete="off" name="j_id93" value="j_id93" /><input type="hidden" autocomplete="off" name="autoScroll" value="" /><input type="hidden" autocomplete="off" name="j_id93:j_idcl" value="" /><input type="hidden" autocomplete="off" name="j_id93:_link_hidden_" value="" /><script type="text/javascript"><!--
function clear_j_id93() {
_clearJSFFormParameters('j_id93','',['j_id93:j_idcl','j_id93:_link_hidden_']);
}
function clearFormHiddenParams_j_id93(){clear_j_id93();}
function clearFormHiddenParams_j_id93(){clear_j_id93();}
clear_j_id93();
//--></script><input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAN0AAVqX2lkMnB0ACcvcGFnaW5hcy9jb25zdWx0YXMvY29uc3VsdGFEaWFyaW8ueGh0bWw=" /></form>
	</div>
</html><?xml version="1.0" encoding="ISO-8859-1"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">

	 <div class="footer-nav">
			<!-- O background j disponibiliza a imagem do TRF e em cima deste background a lista abaixo no deve constar nos sistemas internos.-->
			<p style="color:#ffffff"></p> <!-- Pensar em algo que a substitua e no fira o layout, caso de errado esta montagem -->
			<ul id="aui-3-2-0-1116510" class="mainlevel foot-nav">
				<li id="aui-3-2-0-1116512">
					<a id="aui-3-2-0-1116511" href="/diarioeletinternet/paginas/orientacoes/orientacaoConsultas.faces" style="background-image: url('/diarioeletinternet/images/stories/ico-doc_lines.png');">Ajuda Sobre o Sistema</a>
				</li>
			</ul>
		</div>
        <div class="footer-contact">
            <span class="footer-contact-left">Cais do Apolo, s/n - Edif&#237;cio Ministro Djaci Falc&#227;o
                <br />
                Bairro do Recife - Recife - PE
                <br />
                CEP 50030-908
            </span>
            <span class="footer-contact-center">
            Vers&#227;o 1.3.3
            </span>
            <span class="footer-contact-right">PABX 81 3425.9000
                <br />
                Protocolo 81 3425 9550
                <br />
                FAX 81 3224 6356
            </span>
        </div>

</html>
			</div>
		</div>
	<!-- MYFACES JAVASCRIPT -->

</body> 

	<script><!--
 
		setFocusCampo('');
	    setHighlight('');
	    setFocus('');
	
//--></script>
	
</html>`

it('getViewState function test', () => {
  expect(getViewState(response)).toEqual('rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAN0AAVqX2lkMnB0ACcvcGFnaW5hcy9jb25zdWx0YXMvY29uc3VsdGFEaWFyaW8ueGh0bWw=');
})