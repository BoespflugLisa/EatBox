<template>

    <div id="ArticlesEtMenus">

        <v-autocomplete
          v-model="model"
          :items="states"
          :readonly="isEditing"
          label="Chercher un article"
          persistent-hint
          prepend-icon="mdi-food"
        >
        </v-autocomplete>

        <h2> Mes articles</h2>



        <div class="mt-4">
            <v-btn class="mr-3 font-40" rounded v-for="(item, index) in categories"
                    v-bind:key=index
                    v-bind:title=item>
                {{ item }}
            </v-btn>

                <v-btn
                  icon
                  color="primary"
                >
                    <v-icon size="30">mdi-plus-circle-outline</v-icon>
                </v-btn>


        </div>
    </div>
</template>

<script>
export default {
    data() {


        return {
            isEditing: false,
            model: null,
            states: [
                'Alabama', 'Alaska', 'American Samoa', 'Arizona',
                'Arkansas', 'California', 'Colorado', 'Connecticut',
                'Delaware', 'District of Columbia', 'Federated States of Micronesia',
                'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
                'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
                'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                'Missouri', 'Montana', 'Nebraska', 'Nevada',
                'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
                'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
                'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
                'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
            ],

            categories: ['Frites', 'Burger','Boissons'],

        }

    },
}

</script>

