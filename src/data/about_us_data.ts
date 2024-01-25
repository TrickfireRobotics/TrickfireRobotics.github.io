import type { sectionsDisplayObject } from "./sectionDisplay_interface";

const basePath = 'https://raw.githubusercontent.com/TrickfireRobotics/TrickfireRobotics.github.io/dev/src/assets/Trickfire_image/slanted_image/about_us/'
const baseResponsivePath = 'https://raw.githubusercontent.com/TrickfireRobotics/TrickfireRobotics.github.io/dev/src/assets/Trickfire_image/original_image/about_us/'

const aboutUsSectionData: sectionsDisplayObject[] = [{
    title: "SOFTWARE TEAM",
    content: "The software team focusses on rover functionality and rover autonomy. They have to work diligently to make sure that their code is properly written, or else it can spell disaster for the robot. From low level CAN bus programming to high level autonomous navigational algorithms, this team does a lot! ",
    image: `${basePath}slanted_software.png`,
    imageResponsive: `${baseResponsivePath}unslanted_software.png`
}, {
    title: "MECHANICAL TEAM",
    content: "The mechanical team focusses on the physical design and assembly of the robot. The team faces the challenge of designing a rover that can mine up to its height below the surface while keeping the weight to under 60kg. The team succeeds in producing an efficient rover by incorporating various light weight composites with elegant design.",
    image: `${basePath}slanted_drilling_right.png`,
    imageResponsive: `${baseResponsivePath}unslanted_drilling_full.png`
},
{
    title: "ELECTRICAL TEAM",
    content: "The electrical team focus on circuitry for signal and power management.With every motor and sensor needing different voltage levels and power distribution, the team works hard to ensure all of them are efficiently integrated through circuit design and power control.With their help the transition between mechanical parts and the software control is seamless.",
    image: `${basePath}slanted_electrical.png`,
    imageResponsive: `${baseResponsivePath}unslanted_electrical.png`
},
{
    title: "FINANCE TEAM",
    content: "The finance team is the backbone of TrickFire's logistical side. Their goal is to secure funding for everything that is done in the team and to coordinate purchases - URC rovers cost tens of thousands of dollars and have hundreds of parts. This team plans a year or more in advance to ensure the club is funded, both by applying for grants and finding industry sponsors.",
    image: `${basePath}slanted_finance.png`,
    imageResponsive: `${baseResponsivePath}unslanted_finance.png`
},
{
    title: "MARKETING TEAM",
    content: "The marketing team is focused on recruitment, outreach efforts to the community, and the making of marketing materials. The marketing team ensures sponsorship promises are met. They also update the club Instagram and LinkedIn.",
    image: `${basePath}slanted_outreach_2016.png`,
    imageResponsive: `${baseResponsivePath}unslanted_outreach_2016.jpg`
}
];
aboutUsSectionData.forEach((section, index) => {
    section.order = 0;
    section.imageOrder = 'left';
    section.contentOrder = 'right';
    return section
})

export { aboutUsSectionData }