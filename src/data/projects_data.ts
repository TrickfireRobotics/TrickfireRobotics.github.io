import type { sectionsDisplayObject } from "./sectionDisplay_interface";

const basePath = './src/assets/Trickfire_image/slanted_image/project/'
const baseResponsivePath = './src/assets/Trickfire_image/original_image/project/'

const projectsSectionData: sectionsDisplayObject[] = [
    {
        title: "Viator",
        content: "Viator, our rover for the 2023-2024 URC Mars competition boasts a manipulator arm capable of fine motor movements, several cameras for travel, a life detection system from soil samples, and both teleoperated and autonomous navigation. For this year's competition, the arm has been significantly simplified in order to reduce weight without losing any of its strength or robustness from the first arm iteration. whole new rover for a new competition from scratch is a tremendous task - but TrickFire did it anyway!",
        image: `${basePath}deployRendering.png`,
        imageResponsive: `${baseResponsivePath}viator.jpg`
    },
    {
        title: "Houdini",
        content: "Houdini, the third iteration of the excavator, dump, trunk, and tread design.With NASA officially launching their Artemis program, the NASA Robotics Mining Competition has shifted its focus to Lunar mining.In response, our newest iteration is a third of its predecessors size, while being able to mine 20% deeper due to our redesign of the arms kinematics.",
        image: `${basePath}slanted_houdini.png`,
        imageResponsive: `${baseResponsivePath}unslanted_houdini.png`

    }, {
        title: "Atlas",
        content: "Atlas is the second iteration of the excavator, dump, trunk, and tread design. Although the fundamental design is the same as Grimlock’s, the team completely overhaled the rover by adding in a reinforced carbon fiber frame, sailcloth dumping bin, and redesigning the drivetrain suspension.As a result, Atlas, with its light carbon fiber frame, now weighs in at 67 kilograms, a significant reduction to prior iterations.",
        image: `${basePath}slanted_atlas.png`,
        imageResponsive: `${baseResponsivePath}unslanted_atlas.png`
    },
    {
        title: "Grimlock",
        content: "Our first mars rover capable of mining past the powdery topsoil, and getting to the icy regolith thirty centimeters underneath. Grimlock boasted a fully dynamic digging arm with four degrees of freedom, similar to a classic excavator, with a dump truck style bin that was used to transport the mined regolith, and tank treads that can drive over any obstacle that could be thrown at it. With an all-aluminum chassis Grimlock weighed in at just shy of 80 kilograms.",
        image: `${basePath}slanted_grimlock.png`,
        imageResponsive: `${baseResponsivePath}unslanted_grimlock.png`
    },
    {
        title: "Daybreak",
        content: " Our entry into the world of extraterrestrial mining, Daybreak was a four wheeled drum digger capable of mining fifteen centimeters below the surface of Mars. The rover featured an all-aluminum frame weighing in at 71 kilograms.",
        image: `${basePath}slanted_daybreak.png`,
        imageResponsive: `${baseResponsivePath}unslanted_daybreak.png`
    }
];
projectsSectionData.forEach((section) => {
    section.order = 0;
    section.imageOrder = 'left';
    section.contentOrder = 'right';
    return section
})

export { projectsSectionData }