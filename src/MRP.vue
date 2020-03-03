<template>
  <div id="mrp">
    <table class="table-responsive table text-light">
      <thead>
        <tr class="bg-primary">
          <th :colspan="11" scope="col" id="MRPtableHeader" class="text-center">MRP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bg-primary" scope="col">Id</td>
          <td class="bg-primary" scope="col">Product Name</td>
          <td class="bg-primary" scope="col">Available Inventory</td>
          <td class="bg-primary" scope="col">Security Inventory</td>
          <td class="bg-primary" scope="col">Parent Product Id</td>
          <td class="bg-primary" scope="col">Amount to Manufacture Parent</td>
          <td class="bg-primary" scope="col">Lead time</td>
          <td class="bg-primary" scope="col">Cost of the article</td>
          <td class="bg-primary" scope="col">Maintenance cost</td>
          <td class="bg-primary" scope="col">Ordering cost</td>
          <td class="bg-primary" scope="col">Lot sizing rule</td>
        </tr>
        <tr :key="'prod' + i" v-for="(product, i) in products">
          <td style='width: 9%; height: 100%;'><input type='text' v-model="products[i].id"></td>
          <td style='width: 9%; height: 100%;'><input type='text' v-model="products[i].productName"></td>
          <td style='width: 9%; height: 100%;'><input type='number' min='0' v-model="products[i].availableInventory"></td>
          <td style='width: 9%; height: 100%;'><input type='number' min='0' v-model="products[i].securityInventory"></td>
          <td style='width: 9%; height: 100%;'><input type='text' v-model="products[i].parentProductId"></td>
          <td style='width: 9%; height: 100%;'><input type='number' min='0' v-model="products[i].amountOfParent"></td>
          <td style='width: 9%; height: 100%;'><input type='number' min='0' v-model="products[i].leadTime"></td>
          <td style='width: 9%; height: 100%;'><input type='text' v-model="products[i].costOfArticle"></td>
          <td style='width: 9%; height: 100%;'><input type='text' v-model="products[i].maintenanceCost"></td>
          <td style='width: 9%; height: 100%;'><input type='text' v-model="products[i].orderingCost"></td>
          <td style='width: 9%; height: 100%;'>
            <select class="text-light bg-primary" v-model="products[i].lotSizingRule" required>
            <option :key="'lsr'+i" v-for="(lotSizingRule,i) in lotSizingRules" selected>{{lotSizingRule}}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="input-group mb-4 flex-nowrap">
      <label class="col-sm-1 text-center">Periodicity: </label>
      <select class="col-sm-3 text-light custom-select bg-primary"  v-model="periodicity" required>
        <option :key="'lsr'+i" v-for="(period,i) in periods">{{period}}</option>
      </select>
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="addConstraint" value="Add product"><div class="col-sm-1"></div>
      <input class="col-sm-5 btn btn-outline-danger expand" type="button" v-on:click="removeConstraint" value="Remove product">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="createMrp" value="Create MRP">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-outline-primary expand" type="button" v-on:click="paintTree" value="Show product tree">
    </div>
    <div id="viewTree"></div>
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
        </thead>
        <tbody :key="'mrp' + j" v-for="(mrp, j) in productsMRP">
          <tr class='bg-primary'>
            <th scope='col'>Period</th>
            <th scope='col' class='text-center' :key="'hp'+period" v-for="period in headerPeriods">{{ period }}</th>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Gross Requeriments</td>
            <td style='width: 9%; height: 100%;' :key="'gr'+ j + '-' + i" v-for="(grossReq, i) in mrp.grossRequirements">
              <input type='number' min='0' v-model="mrp.grossRequirements[i]">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Scheduled Receptions</td>
            <td style='width: 9%; height: 100%;' :key="'sr'+ j + '-' + i" v-for="(schedReq, i) in mrp.scheduledRequirements">
              <input type='number' min='0' v-model="mrp.scheduledRequirements[i]">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Available Inventory Programmed</td>
            <td style='width: 9%; height: 100%;' :key="'aip'+ j + '-' + i" v-for="(avaInvPro, i) in mrp.availInventProgrammed" 
              :value="avaInvPro">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Net requirements</td>
            <td style='width: 9%; height: 100%;' :key="'aip'+ j + '-' + i" v-for="(netReq, i) in mrp.netRequirements" 
              :value="netReq">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Receptions of planned orders</td>
            <td style='width: 9%; height: 100%;' :key="'rcpo'+ j + '-' + i" v-for="(recepPlOrd, i) in mrp.receptionPlannedOrders" 
              :value="recepPlOrd">
            </td>
          </tr>
          <tr>
            <td class='bg-primary' scope='row'>Release of planned orders</td>
            <td style='width: 9%; height: 100%;' :key="'rlpo'+ j + '-' + i" v-for="(relePlOrd, i) in mrp.releasePlannedOrders" 
              :value="relePlOrd">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";


export default {
  name: "mrp",
  components: {
    Footer
  },
  data() {
    return {
      periods: ['Annual', 'Monthly', 'Weekly', 'Daily'],
      lotSizingRules: ['Lot for Lot', 'Economic Order Quantity', 'Periods Of Supply', 'Least Unit Cost', 'Least Total Cost'],
      
      //TO-DO - not important right now
      //Add mrp to product object instead of keeping it as another one.

      allProductsIds: ['none'],
      products: [{
        id: '',
        productName: '',
        availableInventory: 0,
        securityInventory: '',
        parentProductId: 'none',
        amountOfParent: 1,
        leadTime: 1,
        costOfArticle: 0,
        maintenanceCost: 0,
        orderingCost: 0,
        lotSizingRule: '',
      }],
      periodicity: '',

      tableIsCreated: false,
      newNumberOfPeriods: 1,
      numberOfPeriods: 0,

      headerPeriods: [],
      productsMRP: [{
        grossRequirements: [],
        scheduledRequirements: [],
        availInventProgrammed: [],
        netRequirements: [],
        receptionPlannedOrders: [],
        releasePlannedOrders: []
      }]
    };
  },
  methods: {
    addConstraint(){
      var newProduct = {
        id: '',
        productName: '',
        availableInventory: 0,
        securityInventory: '',
        parentProductId: 'none',
        amountOfParent: 1,
        leadTime: 1,
        costOfArticle: 0,
        maintenanceCost: 0,
        orderingCost: 0,
        lotSizingRule: '',
      };
      var newMRP = {
        grossRequirements: [],
        scheduledRequirements: [],
        availInventProgrammed: [],
        netRequirements: [],
        receptionPlannedOrders: [],
        releasePlannedOrders: []
      }
      this.products.push(newProduct)
      this.productsMRP.push(newMRP);
    },
    removeConstraint(){
      this.products.pop()
      this.productsMRP.pop();
    },
    createMrp(){

    },
    paintTree(){

    },
    createTable(){
      if(!this.tableIsCreated){
        this.tableIsCreated = true;
      }
      if(this.numberOfPeriods < this.newNumberOfPeriods){
        for (let i = this.numberOfPeriods; i < this.newNumberOfPeriods; i++) {
          this.headerPeriods[i] = parseInt(i)+1;
          for(let j = 0; j < this.productsMRP.length; j++){
            this.productsMRP[j].grossRequirements[i] = 0;
            this.productsMRP[j].scheduledRequirements[i] = 0;
            this.productsMRP[j].availInventProgrammed[i] = 0;
            this.productsMRP[j].netRequirements[i] = 0;
            this.productsMRP[j].receptionPlannedOrders[i] = 0;
            this.productsMRP[j].releasePlannedOrders[i] = 0;
          }
        }
      }else if(this.numberOfPeriods > this.newNumberOfPeriods){
        for (let i = this.newNumberOfPeriods; i < this.numberOfPeriods; i++) {
          this.headerPeriods.pop();
          for(let j = 0; j < this.productsMRP.length; j++){
            this.productsMRP[j].grossRequirements.pop();
            this.productsMRP[j].scheduledRequirements.pop();
            this.productsMRP[j].availInventProgrammed.pop();
            this.productsMRP[j].netRequirements.pop();
            this.productsMRP[j].receptionPlannedOrders.pop();
            this.productsMRP[j].releasePlannedOrders.pop();
          }
        }
      }
      this.numberOfPeriods = this.newNumberOfPeriods;
      window.console.log(this.periodicity);
    },
  }
};
</script>

<style>
</style>