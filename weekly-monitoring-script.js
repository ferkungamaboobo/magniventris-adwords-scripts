function main() {
	const today = new Date();
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setTime(today-2592000000);
	const sixtyDaysAgo = new Date();
	sixtyDaysAgo.setTime(today-5184000000);
	const ninetyDaysAgo = new Date();
	ninetyDaysAgo.setTime(today-7776000000);
	const oneEightyDaysAgo = new Date();
	oneEightyDaysAgo.setTime(today-15552000000);
	var imprThirtyDayMargin = 12; //int - +/- percentage for 30 day over 30 day impression change
	var imprNinetyDayMargin = 24; //int - +/- percentage for 90 dayover 90 day impression change
	var cpcThirtyDayMargin = 10; //int - +/- percentage for 30 day over 30 day CPC change
	var cpcNinetyDayMargin = 10; //int - +/- percentage for 90 dayover 90 day CPC change
	var costThirtyDayMargin = 10; //int - +/- percentage for 30 day over 30 day Cost change
	var costNinetyDayMargin = 10; //int - +/- percentage for 90 day over 90 day Cost change
	var emailEmails = '' //Comma-delimited list of emails to receive email report
	var accountID = '' //Plaintext name of account for Subject Line
	var emailBody = ''; //leave blank
	
	var campaignIterator = AdsApp.campaigns()
	.withCondition('Status = ENABLED').get();
	
   function percIncrease(a, b) {
        var percent;
        if(b !== 0) {
            if(a !== 0) {
                percent = (b - a) / a * 100;
            } else {
                percent = b * 100;
            }
        } else {
            percent = - a * 100;            
        }       
        return Math.floor(percent);
    }
  
	while (campaignIterator.hasNext()) {
		var campaign = campaignIterator.next();
		var impr30Days = campaign.getStatsFor({year: thirtyDaysAgo.getFullYear(),month: thirtyDaysAgo.getMonth()+1, day: thirtyDaysAgo.getDate()},{year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}).getImpressions();
		var impr3060Days = campaign.getStatsFor({year: sixtyDaysAgo.getFullYear(),month: sixtyDaysAgo.getMonth()+1, day: sixtyDaysAgo.getDate()},{year: thirtyDaysAgo.getFullYear(),month: thirtyDaysAgo.getMonth()+1, day: thirtyDaysAgo.getDate()}).getImpressions()
		var impr90Days = campaign.getStatsFor({year: ninetyDaysAgo.getFullYear(),month: ninetyDaysAgo.getMonth()+1, day: ninetyDaysAgo.getDate()},{year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}).getImpressions();
		var impr90180Days = campaign.getStatsFor({year: oneEightyDaysAgo.getFullYear(),month: oneEightyDaysAgo.getMonth()+1, day: oneEightyDaysAgo.getDate()},{year: ninetyDaysAgo.getFullYear(), month: ninetyDaysAgo.getMonth()+1, day: ninetyDaysAgo.getDate()}).getImpressions();
		
		var cpc30Days = campaign.getStatsFor({year: thirtyDaysAgo.getFullYear(),month: thirtyDaysAgo.getMonth()+1, day: thirtyDaysAgo.getDate()},{year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}).getAverageCpc();
		var cpc3060Days = campaign.getStatsFor({year: sixtyDaysAgo.getFullYear(),month: sixtyDaysAgo.getMonth()+1, day: sixtyDaysAgo.getDate()},{year: thirtyDaysAgo.getFullYear(),month: thirtyDaysAgo.getMonth()+1, day: thirtyDaysAgo.getDate()}).getAverageCpc()
		var cpc90Days = campaign.getStatsFor({year: ninetyDaysAgo.getFullYear(),month: ninetyDaysAgo.getMonth()+1, day: ninetyDaysAgo.getDate()},{year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}).getAverageCpc();
		var cpc90180Days = campaign.getStatsFor({year: oneEightyDaysAgo.getFullYear(),month: oneEightyDaysAgo.getMonth()+1, day: oneEightyDaysAgo.getDate()},{year: ninetyDaysAgo.getFullYear(), month: ninetyDaysAgo.getMonth()+1, day: ninetyDaysAgo.getDate()}).getAverageCpc();
		
		var cost30Days = campaign.getStatsFor({year: thirtyDaysAgo.getFullYear(),month: thirtyDaysAgo.getMonth()+1, day: thirtyDaysAgo.getDate()},{year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}).getCost();
		var cost3060Days = campaign.getStatsFor({year: sixtyDaysAgo.getFullYear(),month: sixtyDaysAgo.getMonth()+1, day: sixtyDaysAgo.getDate()},{year: thirtyDaysAgo.getFullYear(),month: thirtyDaysAgo.getMonth()+1, day: thirtyDaysAgo.getDate()}).getCost()
		var cost90Days = campaign.getStatsFor({year: ninetyDaysAgo.getFullYear(),month: ninetyDaysAgo.getMonth()+1, day: ninetyDaysAgo.getDate()},{year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}).getCost();
		var cost90180Days = campaign.getStatsFor({year: oneEightyDaysAgo.getFullYear(),month: oneEightyDaysAgo.getMonth()+1, day: oneEightyDaysAgo.getDate()},{year: ninetyDaysAgo.getFullYear(), month: ninetyDaysAgo.getMonth()+1, day: ninetyDaysAgo.getDate()}).getCost();

		if ( (percIncrease(impr3060Days, impr30Days) > imprThirtyDayMargin) || (percIncrease(impr3060Days, impr30Days) < -imprThirtyDayMargin) ) {
			emailBody += campaign.getName() + " 30-day impressions " + percIncrease(impr3060Days, impr30Days) + "%";
			emailBody += "\r\n";
		}
		if ( (percIncrease(impr90180Days, impr90Days) > imprNinetyDayMargin) || (percIncrease(impr90180Days, impr90Days) < -imprNinetyDayMargin) ) {
			emailBody += campaign.getName() + " 90-day impressions " + percIncrease(impr90180Days, impr90Days) + "%"
			emailBody += "\r\n";
		}
		if ( ((percIncrease(impr3060Days, impr30Days) > imprThirtyDayMargin) || (percIncrease(impr3060Days, impr30Days) < -imprThirtyDayMargin)) && ((percIncrease(impr90180Days, impr90Days) > imprNinetyDayMargin) || (percIncrease(impr90180Days, impr90Days) < -imprNinetyDayMargin)) ) {
			emailBody += "red alert! Impressions! " + campaign.getName() + " red alert! Impressions!";
			emailBody += "\r\n";
		}
		emailBody += "\r\n~~~~\r\n";
		
		if ( (percIncrease(cpc3060Days, cpc30Days) > cpcThirtyDayMargin) || (percIncrease(cpc3060Days, cpc30Days) < -cpcThirtyDayMargin) ) {
			emailBody += campaign.getName() + " 30-day cpc " + percIncrease(cpc3060Days, cpc30Days) + "%";
			emailBody += "\r\n";
		}
		if ( (percIncrease(cpc90180Days, cpc90Days) > cpcNinetyDayMargin) || (percIncrease(cpc90180Days, cpc90Days) < -cpcNinetyDayMargin) ) {
			emailBody += campaign.getName() + " 90-day cpc " + percIncrease(cpc90180Days, cpc90Days) + "%"
			emailBody += "\r\n";
		}
		if ( ((percIncrease(cpc3060Days, cpc30Days) > cpcThirtyDayMargin) || (percIncrease(cpc3060Days, cpc30Days) < -cpcThirtyDayMargin)) && ((percIncrease(cpc90180Days, cpc90Days) > cpcNinetyDayMargin) || (percIncrease(cpc90180Days, cpc90Days) < -cpcNinetyDayMargin)) ) {
			emailBody += "red alert! CPC! " + campaign.getName() + " red alert! CPC!";
			emailBody += "\r\n";
		}
		emailBody += "\r\n~~~~\r\n";
		
		if ( (percIncrease(cost3060Days, cost30Days) > costThirtyDayMargin) || (percIncrease(cost3060Days, cost30Days) < -costThirtyDayMargin) ) {
			emailBody += campaign.getName() + " 30-day spend " + percIncrease(cost3060Days, cost30Days) + "%";
			emailBody += "\r\n";
		}
		if ( (percIncrease(cost90180Days, cost90Days) > costNinetyDayMargin) || (percIncrease(cost90180Days, cost90Days) < -costNinetyDayMargin) ) {
			emailBody += campaign.getName() + " 90-day spend " + percIncrease(cost90180Days, cost90Days) + "%"
			emailBody += "\r\n";
		}
		if ( ((percIncrease(cost3060Days, cost30Days) > costThirtyDayMargin) || (percIncrease(cost3060Days, cost30Days) < -costThirtyDayMargin)) && ((percIncrease(cost90180Days, cost90Days) > costNinetyDayMargin) || (percIncrease(cost90180Days, cost90Days) < -costNinetyDayMargin)) ) {
			emailBody += "red alert! Spend! " + campaign.getName() + " red alert! Spend!";
			emailBody += "\r\n";
		}
		emailBody += "\r\n~~~~\r\n";
	}

	MailApp.sendEmail(emailEmails, accountID + " Weekly Impressions Report", emailBody);
} 
