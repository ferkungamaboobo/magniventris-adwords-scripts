function main() {
  function getBudget() { 
    // future - pull from some place
    budget = 874.57;
  }
  function getAcctCost() {
    var currentAccount = AdsApp.currentAccount();
    var stats = currentAccount.getStatsFor('THIS_MONTH');
    monthCost = stats.getCost();
    Logger.log('$' + monthCost + ' cost');
  }
  function pauseCampaign() {
    var campaignIterator = AdsApp.campaigns().get();
    while (campaignIterator.hasNext()) {
      var campaign = campaignIterator.next();
      campaign.pause();
    }
  }
  function compareBudgets() {
    if(monthCost > budget) {
      pauseCampaign();
    }
  }
  getBudget();
  getAcctCost();
  compareBudgets();
}
