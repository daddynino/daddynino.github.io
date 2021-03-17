function doCalc()
{

    
    // Get the call code, see if it's a CAA call or not.
    // No CAA = no REMs, RPMs, PR1 or Night shift premium

    var selObjCC = document.getElementById("CallCodeID");
    var selValue = selObjCC.options[selObjCC.selectedIndex].value;
    //alert("selValue = " + selValue);

    // Quick generic variables
    var TaxRate = "0.13";
    var DriverShare = "0.30";
    var mPayDayRate = "0.6"
    var mPayNightRate = "0.63"
    var freeREMs = "10"
    var WorkTimeBlock = "30"
    var WorkTimePay = "7"

    // Driver working nights? Sign-in after 7pm...
    // Gets more per call on nights, and more per km
    if (chkShiftPremium.checked == true)
    {
        var mPay = mPayNightRate;
        if (selValue > 0)
        {
            var selValue = parseFloat(selValue) + parseFloat(6);
        }
    }
    else
    {
        var mPay = mPayDayRate;
    }




    // Change variable name, 
    var CallCodeID = selValue;
    //alert("Call code price is " + CallCodeID);



    // only do REM and RPM calc if its an actual caa call
    // Otherwise, just do the cash calc at the bottom
    if (CallCodeID > 0)
    {
        //Get REMs, must not be null, and at least > 10 to count
        var selObjE = document.getElementById("CAAREMs").value;
        //sanity check, must be more than 10 to qualify and not null
        // reverts to 0 otherwise
        if (isNaN(selObjE) || selObjE < freeREMs)
        {
            var selObjE = 0
        };
        if (selObjE >= freeREMs)
        {
            var cREMs = (selObjE - freeREMs) * mPay;
        }
        else
        {
            var cREMs = 0;
        }


        var selObjP = document.getElementById("CAARPMs").value;
        //sanity check, must be more than 10 to qualify and not null
        // reverts to 0 otherwise
        if (isNaN(selObjP) || selObjP < freeREMs)
        {
            var selObjP = 0
        };
        if (selObjP >= freeREMs)
        {
            var cRPMs = (selObjP - freeREMs) * mPay;
        }
        else
        {
            var cRPMs = 0;
        }
        //alert("RPM Pay is " + cRPMs)

        var selObjWT = document.getElementById("PR1Time").value;
        //sanity check, must be more than WorkTimeBlock to qualify
        // reverts to 0 otherwise
        if (isNaN(selObjWT) || selObjWT < WorkTimeBlock)
        {
            var selObjWT = 0;
        }
        if (selObjWT >= WorkTimeBlock)
        {

            //alert("Original is " + selObj);
            var WTimeM = selObjWT % WorkTimeBlock;
            //alert("mod is " + WTimeM);
            var WTime = selObjWT - WTimeM;
            //alert("minus mod is " + WTime + " ans selobj is still " + selObj);
            var WTime = WTime / WorkTimeBlock * WorkTimePay;

        }
        else
        // if work time less than WorkTimeBlock, or not a valid number, assume 0
        {
            var WTime = 0;
        }
        //alert(WTime)

    }
    else // must be a cash call
    {

        var cREMs = 0;
        var cRPMs = 0;
        var WTime = 0;
    }

    var tPay = parseFloat(CallCodeID) + parseFloat(cRPMs) + parseFloat(cREMs) + parseFloat(WTime);
    //var tPay = tPay + cREMs;
    //var tPay = tPay + WTime;
    var tPay = tPay.toFixed(2);
    //alert("pay is $" + tPay);
    //alert(tPay)

    var ServiceCall = document.getElementById("ServiceCall").value;
    var TowingCharges = document.getElementById("TowingCharges").value;
    var StorageFees = document.getElementById("StorageFees").value;
    var WinchingTime = document.getElementById("WinchingTime").value;

    // basic sanity checks, if null or less than zero, its zero in my books
    //alert(document.getElementById("ServiceCall").value.length)

    if (document.getElementById("ServiceCall").value.length == 0){
        var ServiceCall = 0;
    }
    if (ServiceCall < 0)
    {
        var ServiceCall = 0;
    }
    if (isNaN(ServiceCall) )//|| document.getElementById("ServiceCall").value.length == 0)
    {
        var ServiceCall = 0;
    };


//alert("ServiceCall is " + ServiceCall)
if (document.getElementById("TowingCharges").value.length == 0) {
    var TowingCharges =0;
}

    if (isNaN(TowingCharges) || TowingCharges < 0)
    {
        var TowingCharges = 0;
    };

    if (document.getElementById("StorageFees").value.length == 0) {
        var StorageFees=0;
    }
    if (isNaN(StorageFees) || StorageFees < 0)
    {
        var StorageFees = 0;
    };

    if (document.getElementById("WinchingTime").value.length == 0) {
        var WinchingTime = 0;
    }
    if (isNaN(WinchingTime) || WinchingTime < 0)
    {
        var WinchingTime = 0;
    };

    var SubTotal = parseFloat(ServiceCall) + parseFloat(TowingCharges) + parseFloat(StorageFees) + parseFloat(WinchingTime); 
    document.getElementById("SubTotal").value = SubTotal.toFixed(2);

    //Do we add GST or not?
    if (chkAddGST.checked == true)
    {
        var GST = document.getElementById("SubTotal").value * TaxRate;
        document.getElementById("GST").value = GST.toFixed(2);
        //alert (GST);
    }
    else
    {
        var GST = 0; //document.getElementById("SubTotal").value * 0.13;
        document.getElementById("GST").value = GST.toFixed(2);
        //alert(GST);
    }


    var TotalCash = parseFloat(GST.toFixed(2)) + parseFloat(SubTotal.toFixed(2));
    document.getElementById("TotalCash").value = TotalCash.toFixed(2);


    //driver doesn't share in storage fees, but gets 30% of everything else
    var MyIncome = parseFloat(tPay) + ((parseFloat(SubTotal) - parseFloat(StorageFees)) * DriverShare);
    document.getElementById("CallIncome").value = MyIncome.toFixed(2);

    //var gender = document.querySelector('input[name = "gender"]:checked').value;
    //alert("You entered " + gender + " for your gender");
}

function LockItDown() {
    var selObjCC = document.getElementById("CallCodeID");
    var selValue = selObjCC.options[selObjCC.selectedIndex].value;

    // Change variable name, 
    var CallCodeID = selValue;
    //alert("Call code price is " + CallCodeID);



    // only do REM and RPM calc if its an actual caa call
    // Otherwise, just do the cash calc at the bottom
    if (CallCodeID > 0) {
        document.getElementById("CAAREMs").disabled = false;
        document.getElementById("CAARPMs").disabled = false;
        document.getElementById("PR1Time").disabled = false;
        document.getElementById("chkShiftPremium").disabled = false;
        document.getElementById("HeavyMinutes").disabled = true;
       }
       else
       {

        document.getElementById("CAAREMs").disabled = true;
        document.getElementById("CAARPMs").disabled = true;
        document.getElementById("PR1Time").disabled = true;
        document.getElementById("chkShiftPremium").disabled = true;
        document.getElementById("HeavyMinutes").disabled = false;
       }
}