<template>
    <div>{{infos.data}}</div>
</template>

<script>
    let page = "restaurants";
    let request = "";

export default {
    name: "TestView",

    data: function(){
        return {
            infos: null,
        }
    },

     mounted() {
         this.$axios.get(`${page}/${request}`)
             .then(response =>(this.infos = response))
    },

    methods:{
         /*callAPI(page, type, datas, request = "") {
            switch (type) {
                case "GET":
                    this.$axios.get(`${page}/${request}`)
                        .then(function (response) {
                            //console.log(response)
                            return response;
                        })
                        .catch(function (error) {
                            console.log(error)
                            return {0: "nop"};
                        })
                        .then(function(response){
                            //console.log(response)
                            //data["infos"] = response
                            datas["hello"] = response["data"]["data"]
                            //console.log(data)
                            return datas;
                        })
                    break;

                default:
                    return {0: "nop"};

                /!*case "POST":
                    return [];
                    break;

                case "PUT":
                    return [];
                    break;

                case "DELETE":
                    return [];
                    break;*!/
            }
        }*/
    }
}
</script>

<style>

</style>