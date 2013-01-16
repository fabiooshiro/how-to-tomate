//perovaz.js
/*
<?xml version="1.0" encoding="UTF-8" ?>
<testsuite errors="0" failures="1" hostname="Brunos-MacBook-Air.local" name="br.com.investtools.funds.FixedIncomeReconcileServiceTests" tests="4" time="4.269" timestamp="2013-01-15T22:11:49">
  <properties />
  <testcase classname="br.com.investtools.funds.FixedIncomeReconcileServiceTests" name="test_find_system_positions" time="2.988" />
  <testcase classname="br.com.investtools.funds.FixedIncomeReconcileServiceTests" name="test_not_find_system_positions" time="0.195" />
  <testcase classname="br.com.investtools.funds.FixedIncomeReconcileServiceTests" name="test_create_fixed_income_transaction" time="0.674" />
  <testcase classname="br.com.investtools.funds.FixedIncomeReconcileServiceTests" name="test_conciliate" time="0.389">
    <failure message="Assertion failed: &#xa;&#xa;assert Discrepancy.findAll().size() == 0&#xa;                   |         |      |&#xa;                   |         1      false&#xa;                   [Criar venda de ALLL3 value: 2200.0000000000]&#xa;" type="junit.framework.AssertionFailedError">junit.framework.AssertionFailedError: Assertion failed: 

assert Discrepancy.findAll().size() == 0
                   |         |      |
                   |         1      false
                   [Criar venda de ALLL3 value: 2200.0000000000]

	at br.com.investtools.funds.FixedIncomeReconcileServiceTests.test_conciliate(FixedIncomeReconcileServiceTests.groovy:100)
</failure>
  </testcase>
  <system-out><![CDATA[--Output from test_find_system_positions--
--Output from test_not_find_system_positions--
--Output from test_create_fixed_income_transaction--
--Output from test_conciliate--
MOCK SecurityService
fakeIt: SecurityService.getOrCreate([symbol:ALLL3], class br.com.investtools.funds.FixedIncome) = ALLL3
MOCK SecurityQuoteService
fakeIt: SecurityQuoteService.getQuote(ALLL3, Sun Jan 13 00:00:00 BRST 2013, null) = null
AHHHHHHHHHHHHHHHHHH
]]></system-out>
  <system-err><![CDATA[--Output from test_find_system_positions--
--Output from test_not_find_system_positions--
--Output from test_create_fixed_income_transaction--
--Output from test_conciliate--
]]></system-err>
</testsuite>
*/

var Perovaz = function(){

    this.write = function(report){
      
      var source = $('#report-template').html();
      var template = Handlebars.compile(source);
      return template(report);
    };

}
