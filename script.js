//Working for Type1

//File from SL server


function OnLoadEmiCalculator(){
    MoratoriumFieldHide();
}

function interestAccruedDuringMoratorium(jsonArray){
    var moratoriumInterests = 0;
   for (var i = 0; i < jsonArray.length; i++) {
       if (jsonArray[i]["Moratorium Period"] === "YES") {
           moratoriumInterests=moratoriumInterests+parseFloat(jsonArray[i]["Interest"])+parseFloat(jsonArray[i]["Extra Interest Accrued"]);
       }
   }
   return moratoriumInterests.toFixed(2);
   
}

function EMI() {

var compoundingFrequency= getValue('EmiCalculator_EXT_Q_compoundingFrequency')			//document.getElementById("compoundingFrequency").value;
var paymentFrequency=	getValue('EmiCalculator_EXT_Q_paymentFrequency')						//document.getElementById("paymentFrequency").value;
var annualInterestRate = parseFloat(getValue('EmiCalculator_EXT_Q_InterestRate'))						//parseFloat(document.getElementById("InterestRate").value);
var loanAmount = parseFloat(getValue('EmiCalculator_EXT_Q_LoanAmount'))	
//parseFloat(document.getElementById("LoanAmount").value);




var loanTermMonths = parseInt(getValue('EmiCalculator_EXT_Q_termsInMonth'))							//parseInt(document.getElementById("termsInMonth").value);
	

    if (isNaN(annualInterestRate) || isNaN(loanAmount) || isNaN(loanTermMonths) || annualInterestRate < 0 || loanAmount <= 0 || loanTermMonths <= 0 || !Number.isInteger(loanTermMonths)) {
        return "Invalid inputs";
    }

    // Define the number of compounding periods per year
    var compoundingPeriodsPerYear;
    switch (compoundingFrequency.toLowerCase()) {
        case 'annually':
            compoundingPeriodsPerYear = 1;
            break;
        case 'semi-annually':
            compoundingPeriodsPerYear = 2;
            break;
        case 'quarterly':
            compoundingPeriodsPerYear = 4;
            break;
        case 'monthly':
            compoundingPeriodsPerYear = 12;
            break;
        case 'weekly':
            compoundingPeriodsPerYear = 52;
            break;
        case 'biweekly':
            compoundingPeriodsPerYear = 26;
            break;
        case 'daily':
            compoundingPeriodsPerYear = 365;
            break;
        default:
            return "Invalid compounding frequency";
    }

    // Define the number of payment periods per year
    var paymentPeriodsPerYear;
    switch (paymentFrequency.toLowerCase()) {
        case 'annually':
            paymentPeriodsPerYear = 1;
            break;
        case 'semi-annually':
            paymentPeriodsPerYear = 2;
            break;
        case 'quarterly':
            paymentPeriodsPerYear = 4;
            break;
        case 'monthly':
            paymentPeriodsPerYear = 12;
            break;
        case 'semi-monthly':
            paymentPeriodsPerYear = 24;
            break;
        case 'biweekly':
            paymentPeriodsPerYear = 26;
            break;
        case 'weekly':
            paymentPeriodsPerYear = 52;
            break;
        default:
            return "Invalid payment frequency";
    }

    var totalPayments = loanTermMonths / 12 * paymentPeriodsPerYear;
    if (!Number.isInteger(totalPayments)) {
        return "Loan term and payment frequency combination is invalid";
    }

    var calculateInstallment = function() {
        var periodicRate = annualInterestRate / compoundingPeriodsPerYear / 100;
        var effectiveRate = Math.pow(1 + periodicRate, compoundingPeriodsPerYear / paymentPeriodsPerYear) - 1;

        if (annualInterestRate === 0) {
            return (loanAmount / totalPayments).toFixed(2);
        }

        var installment = ((loanAmount * effectiveRate) / (1 - Math.pow(1 + effectiveRate, -totalPayments))).toFixed(2);

        return parseFloat(installment);
    }

    
    setValue('EmiCalculator_EXT_Q_emiResult',calculateInstallment());
}













const periodsPerYear = {
    'annually': 1,
        'semi-annually': 2,
        'quarterly': 4,
        'monthly': 12,
        'semi-monthly':24,
        'weekly': 52,
        'biweekly': 26      // Four payments per month
};
function EMIS(loanAmount, loanTermMonths, annualInterestRate, compoundingFrequency, paymentFrequency) {
    var annualInterestRate = parseFloat(annualInterestRate);
    var loanAmount = parseFloat(loanAmount);
    var loanTermMonths = parseInt(loanTermMonths);

    if (isNaN(annualInterestRate) || isNaN(loanAmount) || isNaN(loanTermMonths) || annualInterestRate < 0 || loanAmount <= 0 || loanTermMonths <= 0 || !Number.isInteger(loanTermMonths)) {
        return "Invalid inputs";
    }

    // Define the number of compounding periods per year
    var compoundingPeriodsPerYear;
    switch (compoundingFrequency.toLowerCase()) {
        case 'annually':
            compoundingPeriodsPerYear = 1;
            break;
        case 'semi-annually':
            compoundingPeriodsPerYear = 2;
            break;
        case 'quarterly':
            compoundingPeriodsPerYear = 4;
            break;
        case 'monthly':
            compoundingPeriodsPerYear = 12;
            break;
        case 'weekly':
            compoundingPeriodsPerYear = 52;
            break;
        case 'biweekly':
            compoundingPeriodsPerYear = 26;
            break;
        case 'daily':
            compoundingPeriodsPerYear = 365;
            break;
        default:
            return "Invalid compounding frequency";
    }

    // Define the number of payment periods per year
    var paymentPeriodsPerYear;
    switch (paymentFrequency.toLowerCase()) {
        case 'annually':
            paymentPeriodsPerYear = 1;
            break;
        case 'semi-annually':
            paymentPeriodsPerYear = 2;
            break;
        case 'quarterly':
            paymentPeriodsPerYear = 4;
            break;
        case 'monthly':
            paymentPeriodsPerYear = 12;
            break;
        case 'semi-monthly':
            paymentPeriodsPerYear = 24;
            break;
        case 'biweekly':
            paymentPeriodsPerYear = 26;
            break;
        case 'weekly':
            paymentPeriodsPerYear = 52;
            break;
        default:
            return "Invalid payment frequency";
    }

    var totalPayments = loanTermMonths / 12 * paymentPeriodsPerYear;
    if (!Number.isInteger(totalPayments)) {
        return "Loan term and payment frequency combination is invalid";
    }

    var calculateInstallment = function() {
        var periodicRate = annualInterestRate / compoundingPeriodsPerYear / 100;
        var effectiveRate = Math.pow(1 + periodicRate, compoundingPeriodsPerYear / paymentPeriodsPerYear) - 1;

        if (annualInterestRate === 0) {
            return (loanAmount / totalPayments).toFixed(2);
        }

        var installment = ((loanAmount * effectiveRate) / (1 - Math.pow(1 + effectiveRate, -totalPayments))).toFixed(2);

        return parseFloat(installment);
    }

    return calculateInstallment();
}

// Function to add appropriate period to the date based on frequency
function addPeriodToDate(date, frequency) {
    var newDate = new Date(date);
    switch (frequency.toLowerCase()) {
        case 'annually':
            newDate.setFullYear(newDate.getFullYear() + 1);
            break;
        case 'semi-annually':
            newDate.setMonth(newDate.getMonth() + 6);
            break;
        case 'quarterly':
            newDate.setMonth(newDate.getMonth() + 3);
            break;
        case 'monthly':
            newDate.setMonth(newDate.getMonth() + 1);
            break;
        case 'semi-monthly':
            newDate.setDate(newDate.getDate() + 15);
            break;
        case 'biweekly':
            newDate.setDate(newDate.getDate() + 14);
            break;
        case 'weekly':
            newDate.setDate(newDate.getDate() + 7);
            break;
        default:
            throw new Error("Invalid payment frequency");
    }
    return newDate;
}

function monthWiseEmi() {
    var loanAmount = parseFloat(getValue("EmiCalculator_EXT_Q_LoanAmount"));//10000;
    var annualInterestRate = parseFloat(getValue("EmiCalculator_EXT_Q_InterestRate"));//10;
    var loanTermMonths = getValue("EmiCalculator_EXT_Q_termsInMonth");//120;  
    var moratoriumStartMonth = getValue("EmiCalculator_EXT_Q_moratoriumStartMonth");//1;  
    var moratoriumEndMonth = getValue("EmiCalculator_EXT_Q_moratoriumEndMonth");//3;
    var jsonArray = [];
    var startDateStr = getValue("EmiCalculator_EXT_Q_LoanDate");//'12/10/2022';
    
    var updatedArray = [];
    var paymentType = getValue("EmiCalculator_EXT_Q_paymentType");//'EndOfThePeriod';
    var paymentFrequency = getValue("EmiCalculator_EXT_Q_paymentFrequency");//'annually';
    var compoundingFrequency = getValue("EmiCalculator_EXT_Q_compoundingFrequency");//'monthly';
    



    var moratoriumType=getValue("EmiCalculator_EXT_Q_moratoriumType");




    function parseDate(dateStr) {
        var parts = dateStr.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;  // Months are zero-based in JavaScript Date
        var year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    var startDate = parseDate(startDateStr);
    var installment = EMIS(loanAmount, loanTermMonths, annualInterestRate, compoundingFrequency, paymentFrequency);

    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1; // Months are zero-based, so add 1
        var year = date.getFullYear();
        return (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
    }

    function calculateMonthlyDetails(loanAmount, annualInterestRate, loanTermMonths, installment) {
        var balance = loanAmount;
        var lumpSum=0;
        var compoundingPeriodsPerYear = {
            'annually': 1,
            'semi-annually': 2,
            'quarterly': 4,
            'monthly': 12,
            'semi-monthly':24,
            'weekly': 52,
            'biweekly': 26
            
        }[compoundingFrequency.toLowerCase()];

        var paymentPeriodsPerYear = {
            'annually': 1,
            'semi-annually': 2,
            'quarterly': 4,
            'monthly': 12,
            'semi-monthly': 24,
            'biweekly': 26,
            'weekly': 52
        }[paymentFrequency.toLowerCase()];

        var periodicRate = annualInterestRate / compoundingPeriodsPerYear / 100;
        var effectiveRate = Math.pow(1 + periodicRate, compoundingPeriodsPerYear / paymentPeriodsPerYear) - 1;
        var extraInterestAccrued = 0;
        var month = 1;
        var currentDate = new Date(startDate);
        

var installmentss=0;


        while (balance > 0) {
            var interest = balance * effectiveRate;
            var principal = 0;
            var moratoriumInterest = 0;
            var extraInterest = 0;

            if (month >= moratoriumStartMonth && month <= moratoriumEndMonth) {
                if(moratoriumType=='Normal'){
                extraInterestAccrued += interest;
                moratoriumInterest = interest; // Store interest accrued during moratorium
                balance += interest; // Interest is accrued during the moratorium period
            }else if(moratoriumType=='LumpSum'){
                moratoriumInterest=interest;
                lumpSum=lumpSum+interest;
            }else if(moratoriumType==='Bullet'){
                moratoriumInterest=interest;
                balance+=interest;
                balance=balance-moratoriumInterest;
            }
				else if (moratoriumType==='Type1'){
				moratoriumInterest=interest;
				balance+=interest
				balance=balance-moratoriumInterest;
			}
				else if(moratoriumType==='Type2'){
					extraInterestAccrued += interest;
                moratoriumInterest = interest; // Store interest accrued during moratorium
                balance += interest;
					
					
				}
				
        }
            else {
                principal = installment - interest - extraInterest;
                if (balance < installment) {
                    principal = balance;
                    installment = balance + interest + extraInterest;
                }
                balance -= principal;
            }



            var interesst=0.00;
            if (month >= moratoriumStartMonth && month <= moratoriumEndMonth) {
                if (moratoriumType === 'Bullet'||moratoriumType==='Type1') {
                    interesst = moratoriumInterest.toFixed(2);
                } else {
                    interesst = "0.00";
                }
            } else{ if((moratoriumType === 'LumpSum') && (month == (parseInt(moratoriumEndMonth) + 1))) {
                interesst = parseInt(lumpSum.toFixed(2))+parseInt(interest.toFixed(2));
                installmentss=interesst+principal;
                //balance=balance+interesst;
                console.log("the value for interesst for lumpSum"+interesst);
            }else if((moratoriumType=='Type1') && (month==(parseInt(moratoriumEndMonth)+1))){
				interesst=parseInt(interest.toFixed(2));
				installmentss=balance+interesst+principal;
				principal=installmentss-interesst;
				balance=0;
				
			}
				else if((moratoriumType=='Type2') && (month==(parseInt(moratoriumEndMonth)+1))){
					interesst=parseInt(interest.toFixed(2));
					installmentss=balance+interesst+principal;
					principal=installmentss-interesst;
					balance=0;
					
					
				}
			
			
			else {
                interesst = interest.toFixed(2);
                console.log("Inside moratoriumendmonth+1"+(moratoriumEndMonth+1));
                
            }
                  }











            var installmentDate = addPeriodToDate(currentDate, paymentFrequency);
            if (paymentType === "BeginingOfThePeriod") {
                installmentDate = new Date(currentDate); // Set to current date first
                currentDate = addPeriodToDate(currentDate, paymentFrequency); // Update current date to installment date
            } else if (paymentType === "EndOfThePeriod") {
                currentDate = addPeriodToDate(currentDate, paymentFrequency); // Update current date to next installment date
                installmentDate = new Date(currentDate); // Update current date to installment date
            }
            var formattedDate = formatDate(installmentDate);
//Due Date (DD/MM/YYYY)
            var newJsonObject = {
                "S.No.": month,
                "Due Date": formattedDate,
                "Moratorium Period": month >= moratoriumStartMonth && month <= moratoriumEndMonth ? "YES" : "NO",
                
                "Installment": month >= moratoriumStartMonth && month <= moratoriumEndMonth ? "0.00":(((moratoriumType === 'LumpSum')||(moratoriumType === 'Type1' )||(moratoriumType === 'Type2' ))&& (month == (parseInt(moratoriumEndMonth) + 1)))?installmentss.toFixed(2):installment.toFixed(2),
                
                //"Installment (KES)": month >= moratoriumStartMonth && month <= moratoriumEndMonth ? "0.00" : installment.toFixed(2),
                
                "Interest":interesst,
                
                
                //"Interest (%)": month >= moratoriumStartMonth && month <= moratoriumEndMonth ? "0.00" :interest.toFixed(2),
                "Principal": principal.toFixed(2),
                "Balance": balance.toFixed(2),
                
                
                
                "Extra Interest Accrued": ((moratoriumType=='PeriodWise')||(moratoriumType=='LumpSum')||(moratoriumType=='Type1')||(moratoriumType=='Bullet'))?"0.00":moratoriumInterest.toFixed(2)
                
                //"Extra Interest Accrued (%)": moratoriumInterest.toFixed(2)
            };

            jsonArray.push(newJsonObject);
            month++;
        }
    }

    calculateMonthlyDetails(loanAmount, annualInterestRate, loanTermMonths, installment);

    updatedArray = JSON.stringify(jsonArray, null);
	console.log(updatedArray);
    // console.log(installment);
    // console.log(jsonArray);
    var totalInterestsWM= totalAmount(paymentFrequency,installment,loanTermMonths);
    var calculateTotalAmount=calculateTotalAmountToBePaid(jsonArray);
    var calculateTotalInterest=parseFloat(calculateTotalInterestToBePaid(jsonArray,moratoriumType)).toFixed(2);
    var EndingDate=calculateEndingDate(jsonArray);
    var calculateSemiMonths=calculateSemiMonthsElapsed(jsonArray)//calculateSemiMonthsElapsed(startDate, currentDate, paymentFrequency);
    var calculatemoratoriumInterest=calculateMoratoriumInterest(jsonArray);
    var calculatemoratoriumPeriod=calculateMoratoriumPeriod(jsonArray);
    var extraperiodneeded=calculateExtraPeriodsNeeded(loanTermMonths, jsonArray, paymentFrequency);
    var calcInterestRatePerPeriod=calculateInterestRatePerperiod(annualInterestRate,paymentFrequency,compoundingFrequency);
    var totalInterestWithoutMoratorium=totalInterest(totalInterestsWM,loanAmount);
var abc=interestAccruedDuringMoratorium(jsonArray);
   


   
    //for moratorium one
    setValue('EmiCalculator_EXT_Q_calculateTotalAmount',calculateTotalAmount);
   

    setValue('EmiCalculator_EXT_Q_calculateTotalInterest',calculateTotalInterest);
    

    setValue('EmiCalculator_EXT_Q_EndingDate',EndingDate);
    

    setValue('EmiCalculator_EXT_Q_calculateSemiMonths',calculateSemiMonths);
    

    setValue('EmiCalculator_EXT_Q_calculatemoratoriumInterest', 
    ((moratoriumType == 'Type1') ||(moratoriumType=='Type2'))
        ? parseFloat(abc) 
        : parseFloat((calculateTotalInterest - totalInterestWithoutMoratorium).toFixed(2)));

	//setValue('EmiCalculator_EXT_Q_calculatemoratoriumInterest',parseFloat((calculateTotalInterest) - totalInterestWithoutMoratorium).toFixed(2));
    
    
    setValue('EmiCalculator_EXT_Q_calculatemoratoriumPeriod',calculatemoratoriumPeriod);
    

    setValue('EmiCalculator_EXT_Q_extraperiodneeded',extraperiodneeded);
    

    setValue('EmiCalculator_EXT_Q_calcinterestrateperperiod',calcInterestRatePerPeriod);
    
    
    
 

    //for without moratorium
    setValue('EmiCalculator_EXT_Q_interestRateWM',calcInterestRatePerPeriod);
       

        setValue('EmiCalculator_EXT_Q_totalAmountWm',totalInterestsWM);
        

        setValue('EmiCalculator_EXT_Q_totalInterestWM',totalInterest(totalInterestsWM,loanAmount));
        

        setValue('EmiCalculator_EXT_Q_ActualYearElapsedWM',actualYearLapsed(loanTermMonths,paymentFrequency));
        

        setValue('EmiCalculator_EXT_Q_EndingDateWm',EndingDateWM(startDateStr,loanTermMonths));
        
        // document.getElementById("calculatemoratoriumInterest").value=totalInterest(totalInterestsWM,loanAmount)-calculateTotalInterest;
        
    

        function EndingDateWM(startDate,loanTermMonths){
            // var dat=startDate;
            // var enddate = new Date(dat);
            // enddate.setFullYear(enddate.getFullYear() + Number(loanTermMonths/12));

            var parts = startDate.split('/');
            var isoDate = ${parts[2]}-${parts[1]}-${parts[0]}; // YYYY-MM-DD format
            var enddate = new Date(isoDate);
            enddate.setFullYear(enddate.getFullYear() + Math.floor(loanTermMonths / 12));
            return formatDate(enddate);
        }  
          

    //console.log(installment);
    //console.log(calculateTotalAmount+'    '+calculateTotalInterest+'    '+EndingDate+'     '+calculateSemiMonths+'    '+calculatemoratoriumInterest+'     '+calculatemoratoriumPeriod+'     '+ extraperiodneeded);
    //console.log(jsonArray);

    
    addDataToGrid('table100', JSON.parse(updatedArray));
}


function calculateTotalAmountToBePaid(jsonArray) {
    var totalAmount = 0;
    var moratoriumperiodinterest=0;
	
    
    for (var i = 0; i < jsonArray.length; i++) {
        if(jsonArray[i]["Moratorium Period"]==="YES"){
            moratoriumperiodinterest+=parseFloat(jsonArray[i]["Interest"]);
            
        }
		
        totalAmount = totalAmount + parseFloat(jsonArray[i]["Installment"]);
    }
	totalAmount=totalAmount+moratoriumperiodinterest;
	
    return totalAmount.toFixed(2);
}

function calculateTotalInterestToBePaid(jsonArray,moratoriumType) {
    var totalInterests = 0;
    var moratoriumperiodinterest=0;
    for (var j = 0; j < jsonArray.length; j++) {
        if((jsonArray[j]["Moratorium Period"]==="YES")&&moratoriumType==='Type2'){
            moratoriumperiodinterest+=parseFloat(jsonArray[j]["Extra Interest Accrued"]);
            
        }
        totalInterests=totalInterests + parseFloat(jsonArray[j]["Interest"]);
    }
	totalInterests+=moratoriumperiodinterest;
    return parseFloat(totalInterests).toFixed(2);
}

function calculateEndingDate(jsonArray) {
    return jsonArray[jsonArray.length - 1]["Due Date"];
}

function calculateSemiMonthsElapsed(jsonArray) {
//     var semiMonthsElapsed = 0;
//     var current = new Date(startDate);
//     while (current <= currentDate) {
//         current = addPeriodToDate(current, paymentFrequency);
//         semiMonthsElapsed++;
//     }
//     return semiMonthsElapsed;
var size=jsonArray.length;
return size;

 }

function calculateMoratoriumInterest(jsonArray) {
    var moratoriumInterest = 0;
    for (var i = 0; i < jsonArray.length; i++) {
        moratoriumInterest += parseFloat(jsonArray[i]["Extra Interest Accrued"]);
    }
    return moratoriumInterest.toFixed(2);
}

function calculateMoratoriumPeriod(jsonArray) {
    var moratoriumPeriod = 0;
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i]["Moratorium Period"] === "YES") {
            moratoriumPeriod++;
        }
    }
    return moratoriumPeriod;
}



function calculateExtraPeriodsNeeded(loanTermMonths, jsonArray, paymentFrequency) {
    var totalInstallments = jsonArray.length;

    // Determine the number of periods per month based on the payment frequency
    /*var periodsPerYear = {
        'annually': 1,
            'semi-annually': 2,
            'quarterly': 4,
            'monthly': 12,
            'semi-monthly':24,
            'weekly': 52,
            'biweekly': 26      // Four payments per month
    }[paymentFrequency.toLowerCase()];*/

    // Calculate the remaining periods
    var remainingPeriods = totalInstallments - Math.ceil(((loanTermMonths/12) * periodsPerYear[paymentFrequency.toLowerCase()]));

    // Return the remaining periods
    return remainingPeriods;
}




//3for WithoutMoratorium calculations functions
function totalAmount(paymentFrequency,installment,loanTermMonths){


    var totAmount=periodsPerYear[paymentFrequency.toLowerCase()]*(loanTermMonths/12)*installment;
    return totAmount.toFixed(2);
    }
    
    
    
    function actualYearLapsed(loanTermMonths,paymentFrequency){

    var actualYearELapsed=(loanTermMonths / 12)*periodsPerYear[paymentFrequency.toLowerCase()];
    return actualYearELapsed;
    }

function calculateInterestRatePerperiod(annualInterestRate,paymentFrequency,compoundingFrequency){
        var interestCompounded=periodsPerYear[compoundingFrequency.toLowerCase()];
        var paymentPeriodss=periodsPerYear[paymentFrequency.toLowerCase()];
        
        
        var periodicrate=annualInterestRate/interestCompounded/100;
        
        var effectiverate=Math.pow(1 + periodicrate, interestCompounded / paymentPeriodss) - 1;
        
        return (effectiverate*100).toFixed(3);
        
}
function totalInterest(totalInterestsWM,loanAmount){


    console.log(totalInterestsWM);
    console.log(loanAmount);
        
        var totInterest=totalInterestsWM-loanAmount;
    return parseFloat(totInterest).toFixed(2);
}
    

// Push Data From EMI Calculator to Facility Grid
function pushToFacilityGrid(){
	let calcLoanAmount, calcInterestRate = 0.00;
	let calcTermsInMonth, calcMoratoriumInMonth = 0;
	let calcRepaymentFreq = '';
	
	calcLoanAmount = getValue('EmiCalculator_EXT_Q_LoanAmount');
	calcTermsInMonth= getValue('EmiCalculator_EXT_Q_termsInMonth');
	calcInterestRate= getValue('EmiCalculator_EXT_Q_InterestRate');
	calcMoratoriumInMonth= getValue('EmiCalculator_EXT_Q_calculatemoratoriumPeriod');
	calcRepaymentFreq= getValue('EmiCalculator_EXT_Q_paymentFrequency');
	calcEMIResult= getValue('EmiCalculator_EXT_Q_emiResult');
	calcTermInUnit = getValue('EmiCalculator_EXT_Q_TermInUnit');
	calcMoratoriumUnit = getValue('EmiCalculator_EXT_Q_MoratoriumUnit');
	calccompoundingFrequency = getValue('EmiCalculator_EXT_Q_compoundingFrequency');

	CalcIsMoratorium = getValue('EmiCalculator_EXT_Q_IsMoritorium');
	if( CalcIsMoratorium == "Yes"){
	 TotalInterestAmount = getValue('EmiCalculator_EXT_Q_calculateTotalInterest');	
	 MoratoriumInterest = getValue('EmiCalculator_EXT_Q_calculatemoratoriumInterest');	
		
	}
	if (CalcIsMoratorium == "No"){
		TotalInterestAmount = getValue('EmiCalculator_EXT_Q_totalInterestWM');		
	}
	
	
	addDataToGrid(facilityTableId,[
	{
		'Group Credit Facility Structure':'',
		'Loan Size': calcLoanAmount,
		'Loan Term (Months)': calcTermsInMonth,
		'Interest Rate (%)': calcInterestRate,
		'Repayment Terms/Frequency': calcRepaymentFreq,
		'Grace Period (Months)': calcMoratoriumInMonth,
		'Repayment Amount (KES)':calcEMIResult,
		'Terms in Unit': calcTermInUnit,
		'Moratorium in Unit': calcMoratoriumUnit,
		'Compounding Frequency':calccompoundingFrequency,
		'Total Interest Amount':TotalInterestAmount,
		'Moratorium Interest':MoratoriumInterest
		
	}]);
}
function Clear(){
    clearValue("EmiCalculator_EXT_Q_calculateTotalAmount");
    clearValue("EmiCalculator_EXT_Q_calculateTotalInterest");
    clearValue("EmiCalculator_EXT_Q_EndingDate");
    clearValue("EmiCalculator_EXT_Q_calculateSemiMonths");
    clearValue("EmiCalculator_EXT_Q_calculatemoratoriumInterest");
    clearValue("EmiCalculator_EXT_Q_calculatemoratoriumPeriod");
    clearValue("EmiCalculator_EXT_Q_extraperiodneeded");
    clearValue("EmiCalculator_EXT_Q_calcinterestrateperperiod");
    clearValue("EmiCalculator_EXT_Q_interestRateWM");
    clearValue("EmiCalculator_EXT_Q_totalAmountWm");
    clearValue("EmiCalculator_EXT_Q_totalInterestWM");
    clearValue("EmiCalculator_EXT_Q_ActualYearElapsedWM");
    clearValue("EmiCalculator_EXT_Q_EndingDateWm");
    
    clearTable("table100");
    }


    function MoratoriumFieldHide(){

        if(getValue("EmiCalculator_EXT_Q_IsMoritorium")==='Yes'){
        setStyle("EmiCalculator_EXT_Q_moratoriumStartMonth", "visible", "true");
        setStyle("EmiCalculator_EXT_Q_moratoriumEndMonth", "visible", "true");
			setStyle("EmiCalculator_EXT_Q_moratoriumType", "visible", "true");
		
        
        }else{
        setStyle("EmiCalculator_EXT_Q_moratoriumStartMonth", "visible", "false");
        setStyle("EmiCalculator_EXT_Q_moratoriumEndMonth", "visible", "false");
			setStyle("EmiCalculator_EXT_Q_moratoriumType", "visible", "false");
        
        }}