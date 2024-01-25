<script lang="ts">
import aboutUs from '../components/row_blocks.vue';
import '../scss/Projects.scss';
import { projectsSectionData } from '../data/projects_data';

export default {
    name: 'MyComponent',
    components: {
        aboutUs
    },
    data() {
        return {
            projectsSectionData: projectsSectionData
        }
    }
}

</script>

<template>
    <div class="page">
        <header id="projects_header">
            <div id="projects_header__background">
                <div id="projects_header__content">
                    <h1 class="fw-semibold">
                        PROJECT
                    </h1>
                    <p style="color: white;">
                        In six years, we have built four rovers for the NASA RMC and URC Competition
                        where fifty teams across
                        the United States compete to build the best rover that can mine under a
                        simulated surface of the moon. A rover starts at the home base,
                        navigates through obstacles, and then reaches a mining zone where it
                        has to break through a few layers. It then digs out regolith (gravel) and
                        trasports it back to the home base, where it deposits the regolith. The
                        process is repeated multiple times.
                    </p>
                </div>
            </div>
        </header>

        <section id="projects_section">
            <div id="projects_rows">
                <div v-for="(projectData) in projectsSectionData">
                    <aboutUs :image__left="projectData.image" :title="projectData.title" :text="projectData.content"
                        :image__left__responsive="projectData.imageResponsive" :isFifBlock="true" />
                </div>
            </div>
        </section>
    </div>
</template>
<style lang="scss"></style>