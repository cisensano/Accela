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
	
	//get workflow tasks from record
	var currentWfTaskStepNumber = aa.env.getValue("SD_STP_NUM");
	logDebug(" currentWfTaskStepNumber: "+currentWfTaskStepNumber);
	var workflowResult = aa.workflow.getTasks(capId);
	if(workflowResult.getSuccess()){
		var wfObj = workflowResult.getOutput();
		var wfObjCount = 0;
		for(i in wfObj){
			wfObjCount++;
			var thisTask = wfObj[i]; logDebug(" ---------- "+wfObjCount+" ---------- ");
			var thisActiveFlag = thisTask.getActiveFlag(); logDebug("   ActiveFlag: "+thisActiveFlag);
			var thisAssignedStaff = thisTask.getAssignedStaff(); logDebug("   AssignedStaff: "+thisAssignedStaff);
			var thisAssignmentDate = thisTask.getAssignmentDate(); logDebug("   AssignmentDate: "+thisAssignmentDate);
			var thisBillable = thisTask.getBillable(); logDebug("   Billable: "+thisBillable);
			var thisCapID = thisTask.getCapID(); logDebug("   CapID: "+thisCapID);
			var thisCompleteFlag = thisTask.getCompleteFlag(); logDebug("   CompleteFlag: "+thisCompleteFlag);
			var thisCurrentTaskID = thisTask.getCurrentTaskID(); logDebug("   CurrentTaskID: "+thisCurrentTaskID);
			var thisDaysDue = thisTask.getDaysDue(); logDebug("   DaysDue: "+thisDaysDue);
			var thisDisposition = thisTask.getDisposition(); logDebug("   Disposition: "+thisDisposition);
			var thisDispositionComment = thisTask.getDispositionComment(); logDebug("   DispositionComment: "+thisDispositionComment);
			var thisDispositionDate = thisTask.getDispositionDate(); logDebug("   DispositionDate: "+thisDispositionDate);
			var thisDispositionDateString = thisTask.getDispositionDateString(); logDebug("   DispositionDateString: "+thisDispositionDateString);
			var thisDispositionNote = thisTask.getDispositionNote(); logDebug("   DispositionNote: "+thisDispositionNote);
			var thisDueDate = thisTask.getDueDate(); logDebug("   DueDate: "+thisDueDate);
			var thisEndTime = thisTask.getEndTime(); logDebug("   EndTime: "+thisEndTime);
			var thisHoursSpent = thisTask.getHoursSpent(); logDebug("   HoursSpent: "+thisHoursSpent);
			var thisNextTaskID = thisTask.getNextTaskID(); logDebug("   NextTaskID: "+thisNextTaskID);
			var thisOverTime = thisTask.getOverTime(); logDebug("   OverTime: "+thisOverTime);
			var thisProcessCode = thisTask.getProcessCode(); logDebug("   ProcessCode: "+thisProcessCode);
			var thisProcessHistorySeq = thisTask.getProcessHistorySeq(); logDebug("   ProcessHistorySeq: "+thisProcessHistorySeq);
			var thisProcessID = thisTask.getProcessID(); logDebug("   ProcessID: "+thisProcessID);
			var thisResDispositionComment = thisTask.getResDispositionComment(); logDebug("   ResDispositionComment: "+thisResDispositionComment);
			var thisResLangID = thisTask.getResLangID(); logDebug("   ResLangID: "+thisResLangID);
			var thisResTaskDescription = thisTask.getResTaskDescription(); logDebug("   ResTaskDescription: "+thisResTaskDescription);
			var thisStartTime = thisTask.getStartTime(); logDebug("   StartTime: "+thisStartTime);
			var thisStatusDate = thisTask.getStatusDate(); logDebug("   StatusDate: "+thisStatusDate);
			var thisStatusDateString = thisTask.getStatusDateString(); logDebug("   StatusDateString: "+thisStatusDateString);
			var thisStepNumber = thisTask.getStepNumber(); logDebug("   StepNumber: "+thisStepNumber);
			var thisTaskDescription = thisTask.getTaskDescription(); logDebug("   TaskDescription: "+thisTaskDescription);
			var thisWorkflowId = thisTask.getWorkflowId(); logDebug("   WorkflowId: "+thisWorkflowId);
			//getTaskItem returns the TaskItemScriptModel object
			var thisTaskItem = thisTask.getTaskItem();
			if(thisTaskItem){
				var thisIsRestrictView4ACA = thisTaskItem.getIsRestrictView4ACA(); logDebug("   IsRestrictView4ACA: "+thisIsRestrictView4ACA);
				var thisRestrictRole = thisTaskItem.getRestrictRole(); logDebug("   RestrictRole: "+thisRestrictRole);
				var thisDisplayInACA = thisTaskItem.getDisplayInACA(); logDebug("   DisplayInACA: "+thisDisplayInACA);
				var thisParallelInd  = thisTaskItem.getParallelInd(); logDebug("   ParallelInd: "+thisParallelInd);
				var thisStaffUser = aa.cap.getStaffByUser(thisTaskItem.getSysUser().getFirstName(),thisTaskItem.getSysUser().getMiddleName(),thisTaskItem.getSysUser().getLastName(),thisTaskItem.getSysUser().toString()).getOutput(); logDebug("   thisStaffUser: "+thisStaffUser);
				if(thisStaffUser){
					var thisStaffUserName = thisStaffUser.toString().split("/").pop().trim(); logDebug("   thisStaffUserName: "+thisStaffUserName);
					var thisStaffUserId = thisStaffUser.getUserID(); logDebug("   thisStaffUserId: "+thisStaffUserId);
				}
			}
			
			var thisTsiResult = aa.taskSpecificInfo.getTaskSpecificInfoByTask(capId, thisProcessID, thisStepNumber);
			if(thisTsiResult.getSuccess()){
				var thisArr = [];
				var thisTsi = thisTsiResult.getOutput();
				if(thisTsi.length > 0){
					logDebug(" "+wfObjCount+" - Storing TSI field names and values to "+thisArr);
					for(a1 in thisTsi){
						thisArr[thisTsi[a1].getCheckboxDesc()] = thisTsi[a1].getChecklistComment();
						logDebug(" *** TSI ::: "+thisTsi[a1].getCheckboxDesc()+" = "+thisTsi[a1].getChecklistComment());
					}
				}
				else{
					logDebug(" "+wfObjCount+" - Task has no TSI");
				}
			}
			
			
//			for(xx in thisTaskItem){
//				logDebug(xx+" : "+thisTaskItem[xx]);
//			}
			
			
			//set thisTaskItem data, task name to be updated
//			var thisIsRestrictView4ACA = thisTaskItem.setIsRestrictView4ACA();
//			var thisRestrictRole = thisTaskItem.setRestrictRole();
//			var thisDisplayInACA = thisTaskItem.setDisplayInACA("N");
//			
//			if(thisTaskDescription == "County Fire Prevention"){
//				aa.workflow.adjustTaskWithNoAudit(thisTaskItem);
//				var thisDisplayInACAUPDATE = thisTaskItem.getDisplayInACA(); logDebug("   DisplayInACAUPDATE: "+thisDisplayInACAUPDATE);
//			}
		}
	}

//INSERT TEST CODE END
	}
catch (err) {
	logDebug("A JavaScript Error occured: " + err.message);
	}
// end user code
aa.env.setValue("ScriptReturnCode", "1"); 	aa.env.setValue("ScriptReturnMessage", debug)