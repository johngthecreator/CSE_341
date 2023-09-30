import { b64Image } from "../b64Image.js";
export const professionalRoute = (req, res) => {
    const data = {
        professionalName: "John Gorriceta",
        base64Image: b64Image,
        nameLink:{
            firstName: "John:",
            url:"https://johngorriceta.com"
        },
        primaryDescription:" a passionate developer focused on creating products that help others!",
        workDescription1:"Web Developer - Barton Consulting",
        workDescription2:"Backend Engineer - BackLocal",
        linkTitleText: "Professional Links",
        linkedInLink: {
            link:"https://www.linkedin.com/in/john-gorriceta-9a0918253/",
            text:"LinkedIn Profile",
        },
        githubLink: {
            link:"https://github.com/johngthecreator",
            text:"Github Profile",
        }
        
    };
    res.json(data)
}