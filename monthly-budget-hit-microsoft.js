function main() {
  // future - pull from some place
  var budget = 400.58;
  var acctCost = ( function getAcctCost() {
    var totalCost = 0;
    var currentAccount = AdsApp.campaigns().forDateRange("THIS_MONTH").get();
    while (currentAccount.hasNext()) {
      var campaign = currentAccount.next().getStats();
      var campaignCost = campaign.getCost();
      var totalCost = totalCost+campaignCost;
    }
    Logger.log('$' + totalCost + ' cost');
    return totalCost;
  })();
  function pauseCampaign() {
    var campaignIterator = AdsApp.campaigns().get();
    while (campaignIterator.hasNext()) {
      var campaign = campaignIterator.next();
      campaign.pause();
    }
  }
  function compareBudgets(costTotal, getBud) {
    if(costTotal > getBud) {
      pauseCampaign();
      Logger.log('cost over budget: ' + costTotal + '>' + getBud);      
    }
    else {
      Logger.log('cost under budget: ' + costTotal + '<' + getBud);
    }
  }
  compareBudgets(acctCost, budget);
}
