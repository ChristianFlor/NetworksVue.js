<template>
  <div id="mps">
    <div>
      <label class="m-2">Enter here the number of periods for the MPS table</label>
      <input class="m-2" type="number" min="1" v-model="newNumberOfPeriods">
      <button class="m-2 btn btn-outline-primary" v-on:click="createTable">Create table</button>
    </div>
    <div>
      <table v-if="tableIsCreated" class='table-responsive table text-light'>
        <thead>
          <tr class='bg-primary'>
            <th :colspan="numberOfPeriods+2" scope='col' id='MPStableHeader' class='text-center'>MPS</th>
          </tr>
          <tr class='bg-primary'>
            <th scope='col'>Period</th>
            <th scope='col' class='text-center' :key="'hp'+period" v-for="period in headerPeriods">{{ period }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class='bg-primary' scope='row'>Gross Requeriments</td>
            <td style='width: 9%; height: 100%;' :key="'gr' + i" v-for="(grossReq, i) in grossRequirements">
              <input type='number' min='0' v-model="grossRequirements[i]">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Scheduled Receptions</td>
            <td style='width: 9%; height: 100%;' :key="'sr' + i" v-for="(schedReq, i) in scheduledRequirements">
              <input type='number' min='0' v-model="scheduledRequirements[i]">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Available Inventory Programmed</td>
            <td style='width: 9%; height: 100%;' :key="'aip' + i" v-for="(avaInvPro, i) in availInventProgrammed" 
              :value="avaInvPro">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Net requirements</td>
            <td style='width: 9%; height: 100%;' :key="'aip' + i" v-for="(netReq, i) in netRequirements" 
              :value="netReq">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Receptions of planned orders</td>
            <td style='width: 9%; height: 100%;' :key="'rcpo' + i" v-for="(recepPlOrd, i) in receptionPlannedOrders" 
              :value="recepPlOrd">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Release of planned orders</td>
            <td style='width: 9%; height: 100%;' :key="'rlpo' + i" v-for="(relePlOrd, i) in releasePlannedOrders" 
              :value="relePlOrd">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-sm-1">
        <div class="input-group mb-2 flex-nowrap ">
          <label class="col" for="itemName">Item Name: </label>
        </div>
        <div class="input-group mb-2 flex-nowrap">
          <label class="col" for="levelCode">Level Code: </label> 
        </div>
        <div class="input-group mb-2 flex-nowrap">
          <label class="col" for="leadTime">Lead Time: </label> 
        </div>
        <div class="input-group mb-4 flex-nowrap">
          <label class="col" for="initialInventory">Security Stock: </label>
        </div>
      </div>
      <div class="col-sm-2"> 
        <div class="input-group mb-4 flex-nowrap ">
          <input class="form-control" type="text" name="itemName" v-model="itemName">
        </div>
        <div class="input-group mb-4 flex-nowrap"> 
          <input class="form-control" type="text" name="levelCode" v-model="itemCode">
        </div>
        <div class="input-group mb-4 flex-nowrap"> 
          <input class="form-control" type="number" min="0" name="leadTime" v-model="leadTime">
        </div>
        <div class="input-group mb-4 flex-nowrap"> 
          <input class="form-control" type="number" min="0" name="securityStock" v-model="securityStock">
        </div>
      </div>
      <div class="col-sm-2">    
        <div class="input-group mb-4 flex-nowrap">
          <label class="col" for="initialInventory">Initial Inventory: </label>
        </div>
        <div class="input-group mb-2 flex-nowrap">
          <label class="col" for="costArticle">Cost of the article: </label> 
        </div>
        <div class="input-group mb-4 flex-nowrap">
          <label class="col" for="maintenanceCost">Maintenance Cost: </label>
        </div>
        <div class="input-group mb-4 flex-nowrap">
          <label class="col" for="orderingCost">Ordering Cost: </label>
        </div>
      </div>
      <div class="col-sm-2"> 
        <div class="input-group mb-2 flex-nowrap">
          <input class="form-control" type="number" min="0" name="initialInventory" v-model="initialInventory">
        </div>
        <div class="input-group mb-4 flex-nowrap"> 
          <input class="form-control" type="text" name="costArticle" v-model="costOfTheArticle">
        </div>
        <div class="input-group mb-3 flex-nowrap">
          <input class="form-control" type="text" name="maintenanceCost" v-model="maintenanceCost">
        </div>
        <div class="input-group mb-3 flex-nowrap">
          <input class="form-control" type="text" name="orderingCost" v-model="orderingCost">
        </div>
      </div>
      <div class="col-sm-2"> 
        <div class="input-group mb-4 flex-nowrap">
          <label  class="col" for="periodicity">Periodicity: </label>
        </div>
        <div class="input-group mb-4 flex-nowrap">
          <label class="col" for="lotSizingRule">Lot Sizing Rule: </label>
        </div>
        <div class="input-group mb-4 flex-nowrap">
          <label class="col" for="TPeriodOFSupply">(T)Period of Supply: </label>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="input-group mb-3 flex-nowrap">
          <select class="col text-light custom-select bg-primary" v-model="periodicity" required>
            <option :key="'per'+i" v-for="(periodOption,i) in periodicityOptions">{{periodOption}}</option>
          </select>
        </div>
        <div class="input-group mb-4 flex-nowrap">
          <select class="col text-light  custom-select bg-primary"  v-model="lotSizingRule" required>
            <option :key="'lsr'+i" v-for="(lotSizingOption,i) in lotSizingRulesOptions">{{lotSizingOption}}</option>
          </select>
        </div>
        <div class="input-group mb-2 flex-nowrap">
          <input class="form-control" type="number" min="0" name="TPeriodOFSupply" v-model="periodsOfSupply">
        </div>
      </div>
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-end">
      <input type="button" class="col-sm-2 btn btn-outline-primary expand" value="Calculate MPS" v-on:click="solveModel"><div class="col-sm-1"> </div>
      <input type="button" class="col-sm-2 btn btn-outline-success expand" value="Calculate all" v-on:click="solveAllModels"><div class="col-sm-1"> </div>
      <input type="button" class="col-sm-3 btn btn-outline-danger expand" value="Compare results" v-on:click="compareResults"><div class="col-sm-1"> </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from './components/Footer.vue'

export default {
  name: 'mps',
  components: {
    Footer
  },
  data(){
    return {
      periodicityOptions: [
        'Annual', 'Monthly', 'Weekly', 'Daily'
      ],
      lotSizingRulesOptions: [
        'Lot for Lot', 'Economic Order Quantity', 'Periods Of Suply', 'Period Order Quantity', 
        'Least Unit Cost', 'Least Total Cost'
      ],
      tableIsCreated: false,
      itemName: '',
      itemCode: '',
      leadTime: 1,
      securityStock: 0,
      initialInventory: 0,
      costOfTheArticle: 0,
      maintenanceCost: 0,
      orderingCost: 0,
      lotSizingRule: '',
      periodsOfSupply: 1,

      numberOfPeriods: 0,
      newNumberOfPeriods: 1,

      periodicity: '',
      //Table attributes
      
      headerPeriods: [],
      grossRequirements: [],
      scheduledRequirements: [],
      availInventProgrammed: [],
      netRequirements: [],
      receptionPlannedOrders: [],
      releasePlannedOrders: []
      
    };
  },
  methods:{
    createTable(){
      if(!this.tableIsCreated){
        this.tableIsCreated = true;
      }
      if(this.numberOfPeriods < this.newNumberOfPeriods){
        for (let i = this.numberOfPeriods; i < this.newNumberOfPeriods; i++) {
          this.headerPeriods[i] = parseInt(i)+1;
          this.grossRequirements[i] = 0;
          this.scheduledRequirements[i] = 0;
          this.availInventProgrammed[i] = 0;
          this.netRequirements[i] = 0;
          this.receptionPlannedOrders[i] = 0;
          this.releasePlannedOrders[i] = 0;
        }
      }else if(this.numberOfPeriods > this.newNumberOfPeriods){
        for (let i = this.newNumberOfPeriods; i < this.numberOfPeriods; i++) {
          this.headerPeriods.pop();
          this.grossRequirements.pop();
          this.scheduledRequirements.pop();
          this.availInventProgrammed.pop();
          this.netRequirements.pop();
          this.receptionPlannedOrders.pop();
          this.releasePlannedOrders.pop();
        }
      }
      this.numberOfPeriods = this.newNumberOfPeriods;
      window.console.log(this.periodicity);
    },
    solveModel(){

    },
    solveAllModels(){

    },
    compareResults(){

    }
  }
}
</script>

<style>

</style>
