<script lang="ts">
import '../scss/row_blocks.scss';


export default {
    name: "aboutUs",
    props: {
        image__left: String,
        title: String,
        text: String,
        image__left__responsive: String,
        link: String,
        linkName: String,
        isFifthBlock: Boolean
    },
    computed: {

        listItems() {
            // Define the bullet point items for the fifth block
            if (this.text) {
                return this.text.split("\n•");
            } else {
                return [];
            }
        },
    },
};
</script>

<template>
    <div class="card__container">
        <div class="image__container">
            <div class="image__left">
                <img :src="image__left">
            </div>

            <div class="words-on-background">
                <img src="../assets/Trickfire_image/slanted_image/row_block/fixed_index_header_left.png" />

                <div class="text-container">
                    <h5 class="fs-3" v-if="title">{{ title }}</h5>
                    <template v-if="isFifthBlock">
                        <p>{{ listItems[0] }}</p>
                        <ul>
                            <li v-for="(item, index) in listItems.slice(1)" :key="index"
                                :class="{ 'bullet-point': index !== 0 && item.startsWith('• ') }">
                                {{ item.startsWith('• ') ? item.substring(2) : item }}
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <p>{{ text }}</p>
                        <a v-if="link" :href="link">{{ linkName }}</a>
                    </template>
                </div>
            </div>
        </div>
        <img class="card__shadow" src="../assets/Trickfire_image/slanted_image/row_block/Background(1).png" />


        <div class="image__container responsive">
            <div class="block responsive">
                <div class="image__left responsive">
                    <img :src="image__left__responsive">
                </div>

                <div class="words-on-background responsive">
                    <h5 class="fs-3 my-3">{{ title }}</h5>

                    <template v-if="isFifthBlock">
                        <p>{{ listItems[0] }}</p>
                        <ul>
                            <li v-for="(item, index) in listItems.slice(1)" :key="index"
                                :class="{ 'bullet-point': index !== 0 && item.startsWith('• ') }">
                                {{ item.startsWith('• ') ? item.substring(2) : item }}
                            </li>
                        </ul>
                    </template>

                    <template v-else>
                        <p>{{ text }}</p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>






