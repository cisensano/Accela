var myCapId = "replaceWithAltId";
var myUserId = "ADMIN";

/* ASB  */  //var eventName = "ApplicationSubmitBefore";
/* ASA  */  //var eventName = "ApplicationSubmitAfter";
/* ASUB  */  //var eventName = "ApplicationStatusUpdateBefore";
/* ASUA  */  //var eventName = "ApplicationStatusUpdateAfter";
/* WTUA */  var eventName = "WorkflowTaskUpdateAfter"; wfTask = "taskName"; wfStatus = "taskStatus"; wfDateMMDDYYYY = "01/01/2016";
/* WTUB */  //var eventName = "WorkflowTaskUpdateBefore"; wfTask = "taskName"; wfStatus = "taskStatus";  wfDateMMDDYYYY = "01/01/2016";
/* IRSA */  //var eventName = "InspectionResultSubmitAfter"; inspResult = "result"; inspResultComment = "comment";  inspType = "inspName"; wfTask = "taskName";
/* ISA  */  //var eventName = "InspectionScheduleAfter"; inspType = "inspName";
/* ISB ALT */ //var eventName = "InspectionMultipleScheduleBefore"; inspType = "inspName"; wfTask = "taskName"; balanceDue = 0;
/* PRA  */  //var eventName = "PaymentReceiveAfter";  
/* ASIUA */ //var eventName = "ApplicationSpecificInfoUpdateAfter";
/* WTUB */  //var eventName = "WorkflowAdhocTaskUpdateBefore";
/* WTUA */  //var eventName = "WorkflowAdhocTaskUpdateAfter";
/* DUA */  //var eventName = "DocumentUploadAfter";

var useProductScript = true;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = false; // set to true to simulate the event and run all std choices/scripts for the record type.  

/* master script code don't touch */ aa.env.setValue("EventName",eventName); var vEventName = eventName;  var controlString = eventName;  var tmpID = aa.cap.getCapID(myCapId).getOutput(); if(tmpID != null){aa.env.setValue("PermitId1",tmpID.getID1()); 	aa.env.setValue("PermitId2",tmpID.getID2()); 	aa.env.setValue("PermitId3",tmpID.getID3());} aa.env.setValue("CurrentUserID",myUserId); var preExecute = "PreExecuteForAfterEvents";var documentOnly = false;var SCRIPT_VERSION = 3.0;var useSA = false;var SA = null;var SAScript = null;var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { 	useSA = true; 		SA = bzr.getOutput().getDescription();	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_INCLUDE_SCRIPT"); 	if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); }	}if (SA) {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",SA,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",SA,useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript,SA,useProductScript));	}else {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useProductScript));	}	eval(getScriptText("INCLUDES_CUSTOM",null,useProductScript));if (documentOnly) {	doStandardChoiceActions2(controlString,false,0);	aa.env.setValue("ScriptReturnCode", "0");	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");	aa.abortScript();	}var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX",vEventName);var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";var doStdChoices = true;  var doScripts = false;var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice ).getOutput().size() > 0;if (bzr) {	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"STD_CHOICE");	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"SCRIPT");	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	}	function getScriptText(vScriptName, servProvCode, useProductScripts) {	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();	vScriptName = vScriptName.toUpperCase();	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();	try {		if (useProductScripts) {			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);		} else {			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");		}		return emseScript.getScriptText() + "";	} catch (err) {		return "";	}}logGlobals(AInfo); if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) } if (runEvent && typeof(doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g,"\r");  aa.print(z); 

//
// User code goes here
//

try {
	showDebug = true;
//INSERT TEST CODE START
	
	var parcelNumber = "2812091020";
	var conditionType = "Parcel";
	var conditionDescription = "Not in City";
	var conditionComment = "Parcel is not located within Santa Clarita city limits";
	var refNumber1 = null;
	var refNumber2 = null;
	var impactCode = "Lock";
	var conditionStatus = "Applied";
	var effectDate = sysDate;
	var expireDate = null;
	var issuedDate = sysDate;
	var statusDate = sysDate;
	var issuedByUser = systemUserObj;
	var statusByUser = systemUserObj;
	var conditionStatusType = "Applied";
	var displayConditionNotice = "Y";
	var includeInConditionName = "Y";
	var includeInShortDescription = "N";
	var inheritable = "Y";
	var longDescripton = null;
	var publicDisplayMessage = null;
	var resolutionAction = null;
	var conditionGroup = "Property";
	var displayNoticeOnACA = "Y";
	var displayNoticeOnACAFee = "N";
	
	var pCondScriptResult = aa.parcelCondition.getParcelConditions(parcelNumber,conditionType);
	if(pCondScriptResult.getSuccess()){
		var pCondList = pCondScriptResult.getOutput()
		for(con in pCondList){
			var thiscon = pCondList[con];
			logDebug("########## getConditionNumber: "+thiscon.getConditionNumber()+" ###############");

			logDebug("getConditionType: "+thiscon.getConditionType());
			logDebug("getConditionDescription: "+thiscon.getConditionDescription());
			logDebug("getConditionComment: "+thiscon.getConditionComment());
			logDebug("getRefNumber1: "+thiscon.getRefNumber1());
			logDebug("getRefNumber2: "+thiscon.getRefNumber2());
			logDebug("getImpactCode: "+thiscon.getImpactCode());
			logDebug("getConditionStatus: "+thiscon.getConditionStatus());
			logDebug("getConditionStatusType: "+thiscon.getConditionStatusType());
			logDebug("getDisplayConditionNotice: "+thiscon.getDisplayConditionNotice());
			logDebug("getIncludeInConditionName: "+thiscon.getIncludeInConditionName());
			logDebug("getIncludeInShortDescription: "+thiscon.getIncludeInShortDescription());
			logDebug("getInheritable: "+thiscon.getInheritable());
			logDebug("getLongDescripton: "+thiscon.getLongDescripton());
			logDebug("getPublicDisplayMessage: "+thiscon.getPublicDisplayMessage());
			logDebug("getResolutionAction: "+thiscon.getResolutionAction());
			logDebug("getConditionGroup: "+thiscon.getConditionGroup());
			logDebug("getDisplayNoticeOnACA: "+thiscon.getDisplayNoticeOnACA());
			logDebug("getDisplayNoticeOnACAFee: "+thiscon.getDisplayNoticeOnACAFee());
			



			
			if(thiscon.getConditionDescription() == "Not in City" && (thiscon.getDisplayNoticeOnACA() != "Y" || thiscon.getImpactCode() == "Hold")){
				thiscon.setDisplayNoticeOnACA("Y");
				thiscon.setImpactCode("Lock");
				var editResult = aa.parcelCondition.editParcelCondition(thiscon);
				if(editResult.getSuccess()){
					logDebug("Successfully updated parcel condition: "+thiscon.getConditionDescription()+" on Parcel: "+parcelNumber);
				}else{
					logDebug("Parcel condition update unsuccessful: "+parcelNumber)
				}
			}else{
				logDebug("No updates needed for parcel: "+parcelNumber)
			}
		}
	}
	
	
	
//	function addParcelConditionWithACA(parcelNum,cType,cStatus,cDesc,cComment,cImpact){
//		var addParcelCondResult = aa.parcelCondition.addParcelCondition(parcelNum,cType,cDesc,cComment,null,null,cImpact,cStatus,sysDate,null,sysDate,sysDate,systemUserObj,systemUserObj,"Applied","Y","N","N",null,null,null,null,null,"Y","N"); 
//		
//        if (addParcelCondResult.getSuccess()){
//			logMessage("Successfully added condition to Parcel " + parcelNum + "  (" + cImpact + ") " + cDesc);
//			logDebug("Successfully added condition to Parcel " + parcelNum + "  (" + cImpact + ") " + cDesc);
//		}else{
//			logDebug( "**ERROR: adding condition to Parcel " + parcelNum + "  (" + cImpact + "): " + addParcelCondResult.getErrorMessage());
//		}
//	}
//	
//	
//	
//	addParcelConditionWithACA(parcelNum,cType,cStatus,cDesc,cComment,cImpact);
	
//INSERT TEST CODE END
	}
catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
	}
// end user code
aa.env.setValue("ScriptReturnCode", "1"); 	aa.env.setValue("ScriptReturnMessage", debug)