<style type="text/css">
        #mynetwork {
          width: 300;
          height: 400px;
          border: 1px solid lightgray;
          background:#d1d1d1;
        }
          #separator{
            height: 60px;
        }
  </style>
   <script type="text/javascript" src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
<template>
  <div id="shPath">
    <table class="table-responsive table text-light">
      <thead>
        <tr class="bg-primary">
          <th :colspan="11" scope="col" id="tableGraph" class="text-center">Adjacency Matrix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bg-primary" scope="col">Node</td>
          <td class="bg-primary" scope="col" :key="'node'+i" v-for="(nod, i) in node">{{nod.id}}</td>
        </tr>
        <tr :key="'node' + i" v-for="(nodeOne, i) in node">
          <td class="bg-primary">{{nodeOne.id}}</td>
          <td style='width: 9%; height: 50%;' :key="'node' + j" v-for="(nodeTwo, j) in node" ><input type='number' v-model="graph[nodeOne.id][nodeTwo.id]"></td>
        </tr>
      </tbody>
    </table>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="addNode" value="Add Node"><div class="col-sm-1"></div>
      <input class="col-sm-5 btn btn-outline-danger expand" type="button" v-on:click="removeNode" value="Remove Node">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="generateGraph" value="Generate Graph">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <div class="col text-center"> Source<input type="number" min="0" style="width: 100%" v-model="from"></div>
      <input class="col-sm-5 btn btn-outline-primary expand" type="button" value="Solve Dikjstra">
    </div>
    <h2 class="text-center">Results</h2>
     <div id="mynetwork"></div>
      <input class="col-sm-12 btn btn-outline-danger expand" type="button" value="Next">

  <div id="separator"></div>

       <div class="input-group-append mb-2 flex-nowrap justify-content-center">
          <div class="col text-center"> Destiny<input type="number" min="0" style="width: 100%" v-model="destinity"></div>
          <input class="col-sm-5 btn btn-outline-primary expand" type="button"  value="Show Path">
        </div>
       <div id="separator"><h2 class="text-center">Distance:</h2> <h2 class="text-center" id="distance"></h2></div>
    <Footer></Footer>
  </div>
</template>
 
<script>
import Footer from "./components/Footer.vue";
import { DataSet, DataView, Network } from "vis";

export default {
  name: "shPath",
  components: {
    Footer
  },
  data() {
    return {
      node: [
        {
            id: 0,
        },{
            id: 1,
        },{
            id: 2,
        },{
            id: 3,
        }
      ],
      
      graph: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
         ['', '', '', ''],
      ],
     currentNode: 3,
     from : "",
     destinity: "",
    network: {
      nodes: [
      ],
     edges: [
      ],
      options: {
        nodes: {
          shape: "circle"
        }
      }
    }
      
    };
  },
  methods: {
    addNode(){
        this.currentNode = this.currentNode+1; // id of new node
        var newNode = {
          id: this.currentNode,   
        };
      for(let i=0; i<this.currentNode; i++){
          this.graph[i].push('');              //add the new node to all nodes
      }
      var newNodes = [];
      for(let i=0; i<=this.currentNode; i++){
          newNodes[i] = '';                  // add all nodes to new node
      }
      this.graph.push(newNodes);
      this.node.push(newNode)
    },
    removeNode(){
      this.currentNode = this.currentNode-1;
      this.graph.pop();
      this.node.pop();
    },
    generateGraph(){
       this.network.nodes = [];
       this.network.edges = [];
        var count = 0;
        const nodesToAdd = new Set();     // it is used to know the nodes to add to network
        for(let i=0; i<this.graph.length;i++){

            for(let j=0; j<this.graph[i].length;j++){
                var cur = this.graph[i][j];
              if(cur!=''){
                    if(!nodesToAdd.has(i)){
                        nodesToAdd.add(i);
                         this.network.nodes.push({id: i, label: 'Node '+i});
                    }if(!nodesToAdd.has(j)){
                        nodesToAdd.add(j);
                         this.network.nodes.push({id: j, label: 'Node '+j});
                    }
                    this.network.edges.push({id: count,from:i, to:j , arrows: 'to', width: 2, length: 400, label: cur, color: "blue"});
                    count++;
                }
                
               
            }
        } 
      var container = document.getElementById('mynetwork');
      this.network = new Network(container, this.network, this.network.options);
    },
  }
}

</script>

<style>
</style>