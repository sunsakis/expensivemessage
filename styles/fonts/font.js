import localFont from "next/font/local";

const titillium = localFont({
    src: [
        {
            path: './TitilliumWeb-Regular.ttf',
            weight: '400',
            style: 'normal',
        }, 
        {
            path: './TitilliumWeb-Bold.ttf',
            weight: '500',
            style: 'bold',
        }, 
        {
            path: './TitilliumWeb-Light.ttf',
            weight: '400',
            style: 'light',
        },
    ],
});

export default titillium;