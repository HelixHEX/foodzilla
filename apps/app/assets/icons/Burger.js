import * as React from 'react';
import Svg, {Mask, Path} from 'react-native-svg';

const BurgerIcon = () => {
    return (
        <Svg height="100%" width="100%" viewBox="0 0 40 40">
            <Mask id="Path-1-inside-1_10_180" fill="white">
                <Path d="M12.3536 9.15356C12.1583 8.9583 12.1583 8.64172 12.3536 8.44645L13.0607 7.73935C13.2559 7.54408 13.5725 7.54408 13.7678 7.73935C13.963 7.93461 13.963 8.25119 13.7678 8.44645L13.0607 9.15356C12.8654 9.34882 12.5488 9.34882 12.3536 9.15356Z" />
                <Path d="M9.75355 10.7607C9.55829 10.9559 9.55829 11.2725 9.75355 11.4678C9.94881 11.663 10.2654 11.663 10.4607 11.4678L11.1678 10.7607C11.363 10.5654 11.363 10.2488 11.1678 10.0536C10.9725 9.85829 10.6559 9.85829 10.4607 10.0536L9.75355 10.7607Z" />
                <Path d="M12.7535 11.7607C12.5583 11.9559 12.5583 12.2725 12.7535 12.4678C12.9488 12.663 13.2654 12.663 13.4607 12.4678L14.1678 11.7607C14.363 11.5654 14.363 11.2488 14.1678 11.0536C13.9725 10.8583 13.6559 10.8583 13.4607 11.0536L12.7535 11.7607Z" />
                <Path d="M15.7535 8.76066C15.5583 8.95592 15.5583 9.27251 15.7535 9.46777C15.9488 9.66303 16.2654 9.66303 16.4607 9.46777L17.1678 8.76066C17.363 8.5654 17.363 8.24882 17.1678 8.05356C16.9725 7.85829 16.6559 7.85829 16.4607 8.05356L15.7535 8.76066Z" />
                <Path d="M18.7535 10.4678C18.5583 10.2725 18.5583 9.95592 18.7535 9.76066L19.4607 9.05356C19.6559 8.85829 19.9725 8.85829 20.1678 9.05356C20.363 9.24882 20.363 9.5654 20.1678 9.76066L19.4607 10.4678C19.2654 10.663 18.9488 10.663 18.7535 10.4678Z" />
                <Path d="M20.7535 11.7607C20.5583 11.9559 20.5583 12.2725 20.7535 12.4678C20.9488 12.663 21.2654 12.663 21.4607 12.4678L22.1678 11.7607C22.363 11.5654 22.363 11.2488 22.1678 11.0536C21.9725 10.8583 21.6559 10.8583 21.4607 11.0536L20.7535 11.7607Z" />
                <Path d="M16.3536 12.7678C16.1583 12.5725 16.1583 12.2559 16.3536 12.0607L17.0607 11.3536C17.2559 11.1583 17.5725 11.1583 17.7678 11.3536C17.963 11.5488 17.963 11.8654 17.7678 12.0607L17.0607 12.7678C16.8654 12.963 16.5488 12.963 16.3536 12.7678Z" />
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.71239 14.5791C5.60806 14.5562 4.70704 13.6261 5.02549 12.5684C5.17539 12.0705 5.37823 11.5832 5.63252 11.1118C6.21519 10.0317 7.0566 9.05679 8.10872 8.24271C9.16083 7.42864 10.403 6.79133 11.7644 6.36719C13.1258 5.94304 14.5797 5.74037 16.0431 5.77073C17.5065 5.80109 18.9507 6.0639 20.2934 6.54415C21.636 7.0244 22.8507 7.71268 23.8681 8.56969C24.8856 9.42671 25.6858 10.4357 26.2232 11.539C26.3085 11.7142 26.387 11.8912 26.4584 12.0698C27.0741 13.608 25.6571 14.9721 24.0006 14.9378L6.71239 14.5791ZM5.98303 12.8567C6.11303 12.4249 6.28963 11.9999 6.51262 11.5866C7.02356 10.6395 7.76965 9.76946 8.72067 9.03361C9.67197 8.29754 10.806 7.71319 12.0619 7.32192C13.3176 6.9307 14.6639 6.74233 16.0224 6.77052C17.3809 6.7987 18.7182 7.04276 19.9566 7.48573C21.1951 7.92875 22.304 8.55963 23.2239 9.33452C24.1436 10.1092 24.8529 11.0094 25.3242 11.9769C25.399 12.1305 25.4676 12.2855 25.53 12.4414C25.6799 12.8158 25.5979 13.141 25.344 13.4182C25.0664 13.7215 24.5808 13.9496 24.0214 13.938L6.73313 13.5793C6.44999 13.5734 6.21734 13.4503 6.08611 13.3011C5.96837 13.1673 5.93284 13.0234 5.98303 12.8567Z" />
                <Path d="M6.5 24.5C5.39543 24.5 4.5 25.3954 4.5 26.5C4.5 27.6046 5.39543 28.5 6.5 28.5H21C21.2761 28.5 21.5 28.2761 21.5 28C21.5 27.7239 21.2761 27.5 21 27.5H6.5C5.94772 27.5 5.5 27.0523 5.5 26.5C5.5 25.9477 5.94772 25.5 6.5 25.5H25.5C26.0523 25.5 26.5 25.9477 26.5 26.5C26.5 27.0523 26.0523 27.5 25.5 27.5H23.5C23.2239 27.5 23 27.7239 23 28C23 28.2761 23.2239 28.5 23.5 28.5H25.5C26.6046 28.5 27.5 27.6046 27.5 26.5C27.5 25.3954 26.6046 24.5 25.5 24.5H6.5Z" />
                <Path d="M5.33634 16.13C5.64376 16.4095 5.89587 16.5 6.1 16.5C6.30413 16.5 6.55625 16.4095 6.86367 16.13C7.28958 15.7428 7.7708 15.5 8.3 15.5C8.82921 15.5 9.31042 15.7428 9.73634 16.13C10.0438 16.4095 10.2959 16.5 10.5 16.5C10.7041 16.5 10.9562 16.4095 11.2637 16.13C11.6896 15.7428 12.1708 15.5 12.7 15.5C13.2292 15.5 13.7104 15.7428 14.1363 16.13C14.4438 16.4095 14.6959 16.5 14.9 16.5C15.1041 16.5 15.3562 16.4095 15.6637 16.13C16.0896 15.7428 16.5708 15.5 17.1 15.5C17.6292 15.5 18.1104 15.7428 18.5363 16.13C18.8438 16.4095 19.0959 16.5 19.3 16.5C19.5041 16.5 19.7562 16.4095 20.0637 16.13C20.4896 15.7428 20.9708 15.5 21.5 15.5C22.0292 15.5 22.5104 15.7428 22.9363 16.13C23.2438 16.4095 23.4959 16.5 23.7 16.5C23.9041 16.5 24.1562 16.4095 24.4637 16.13C24.8896 15.7428 25.3708 15.5 25.9 15.5C26.4292 15.5 26.9104 15.7428 27.3363 16.13C27.5407 16.3158 27.5557 16.632 27.37 16.8363C27.1842 17.0407 26.868 17.0557 26.6637 16.87C26.3562 16.5905 26.1041 16.5 25.9 16.5C25.6959 16.5 25.4438 16.5905 25.1363 16.87C24.7104 17.2572 24.2292 17.5 23.7 17.5C23.1708 17.5 22.6896 17.2572 22.2637 16.87C21.9562 16.5905 21.7041 16.5 21.5 16.5C21.2959 16.5 21.0438 16.5905 20.7363 16.87C20.3104 17.2572 19.8292 17.5 19.3 17.5C18.7708 17.5 18.2896 17.2572 17.8637 16.87C17.5562 16.5905 17.3041 16.5 17.1 16.5C16.8959 16.5 16.6438 16.5905 16.3363 16.87C15.9104 17.2572 15.4292 17.5 14.9 17.5C14.3708 17.5 13.8896 17.2572 13.4637 16.87C13.1562 16.5905 12.9041 16.5 12.7 16.5C12.4959 16.5 12.2438 16.5905 11.9363 16.87C11.5104 17.2572 11.0292 17.5 10.5 17.5C9.9708 17.5 9.48958 17.2572 9.06367 16.87C8.75625 16.5905 8.50413 16.5 8.3 16.5C8.09587 16.5 7.84376 16.5905 7.53634 16.87C7.11043 17.2572 6.62921 17.5 6.1 17.5C5.5708 17.5 5.08958 17.2572 4.66367 16.87C4.45934 16.6842 4.44428 16.368 4.63003 16.1637C4.81579 15.9593 5.13201 15.9443 5.33634 16.13Z" />
                <Path d="M6.5 20C6.5 19.7239 6.72386 19.5 7 19.5H26C26.2761 19.5 26.5 19.2761 26.5 19C26.5 18.7239 26.2761 18.5 26 18.5H7C6.17158 18.5 5.5 19.1716 5.5 20C5.5 20.8284 6.17158 21.5 7 21.5H25C25.2761 21.5 25.5 21.7239 25.5 22C25.5 22.2761 25.2761 22.5 25 22.5H6C5.72386 22.5 5.5 22.7239 5.5 23C5.5 23.2761 5.72386 23.5 6 23.5H25C25.8284 23.5 26.5 22.8284 26.5 22C26.5 21.1716 25.8284 20.5 25 20.5H7C6.72386 20.5 6.5 20.2761 6.5 20Z" />
            </Mask>
            <Path d="M12.3536 9.15356C12.1583 8.9583 12.1583 8.64172 12.3536 8.44645L13.0607 7.73935C13.2559 7.54408 13.5725 7.54408 13.7678 7.73935C13.963 7.93461 13.963 8.25119 13.7678 8.44645L13.0607 9.15356C12.8654 9.34882 12.5488 9.34882 12.3536 9.15356Z" fill="black" />
            <Path d="M9.75355 10.7607C9.55829 10.9559 9.55829 11.2725 9.75355 11.4678C9.94881 11.663 10.2654 11.663 10.4607 11.4678L11.1678 10.7607C11.363 10.5654 11.363 10.2488 11.1678 10.0536C10.9725 9.85829 10.6559 9.85829 10.4607 10.0536L9.75355 10.7607Z" fill="black" />
            <Path d="M12.7535 11.7607C12.5583 11.9559 12.5583 12.2725 12.7535 12.4678C12.9488 12.663 13.2654 12.663 13.4607 12.4678L14.1678 11.7607C14.363 11.5654 14.363 11.2488 14.1678 11.0536C13.9725 10.8583 13.6559 10.8583 13.4607 11.0536L12.7535 11.7607Z" fill="black" />
            <Path d="M15.7535 8.76066C15.5583 8.95592 15.5583 9.27251 15.7535 9.46777C15.9488 9.66303 16.2654 9.66303 16.4607 9.46777L17.1678 8.76066C17.363 8.5654 17.363 8.24882 17.1678 8.05356C16.9725 7.85829 16.6559 7.85829 16.4607 8.05356L15.7535 8.76066Z" fill="black" />
            <Path d="M18.7535 10.4678C18.5583 10.2725 18.5583 9.95592 18.7535 9.76066L19.4607 9.05356C19.6559 8.85829 19.9725 8.85829 20.1678 9.05356C20.363 9.24882 20.363 9.5654 20.1678 9.76066L19.4607 10.4678C19.2654 10.663 18.9488 10.663 18.7535 10.4678Z" fill="black" />
            <Path d="M20.7535 11.7607C20.5583 11.9559 20.5583 12.2725 20.7535 12.4678C20.9488 12.663 21.2654 12.663 21.4607 12.4678L22.1678 11.7607C22.363 11.5654 22.363 11.2488 22.1678 11.0536C21.9725 10.8583 21.6559 10.8583 21.4607 11.0536L20.7535 11.7607Z" fill="black" />
            <Path d="M16.3536 12.7678C16.1583 12.5725 16.1583 12.2559 16.3536 12.0607L17.0607 11.3536C17.2559 11.1583 17.5725 11.1583 17.7678 11.3536C17.963 11.5488 17.963 11.8654 17.7678 12.0607L17.0607 12.7678C16.8654 12.963 16.5488 12.963 16.3536 12.7678Z" fill="black" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.71239 14.5791C5.60806 14.5562 4.70704 13.6261 5.02549 12.5684C5.17539 12.0705 5.37823 11.5832 5.63252 11.1118C6.21519 10.0317 7.0566 9.05679 8.10872 8.24271C9.16083 7.42864 10.403 6.79133 11.7644 6.36719C13.1258 5.94304 14.5797 5.74037 16.0431 5.77073C17.5065 5.80109 18.9507 6.0639 20.2934 6.54415C21.636 7.0244 22.8507 7.71268 23.8681 8.56969C24.8856 9.42671 25.6858 10.4357 26.2232 11.539C26.3085 11.7142 26.387 11.8912 26.4584 12.0698C27.0741 13.608 25.6571 14.9721 24.0006 14.9378L6.71239 14.5791ZM5.98303 12.8567C6.11303 12.4249 6.28963 11.9999 6.51262 11.5866C7.02356 10.6395 7.76965 9.76946 8.72067 9.03361C9.67197 8.29754 10.806 7.71319 12.0619 7.32192C13.3176 6.9307 14.6639 6.74233 16.0224 6.77052C17.3809 6.7987 18.7182 7.04276 19.9566 7.48573C21.1951 7.92875 22.304 8.55963 23.2239 9.33452C24.1436 10.1092 24.8529 11.0094 25.3242 11.9769C25.399 12.1305 25.4676 12.2855 25.53 12.4414C25.6799 12.8158 25.5979 13.141 25.344 13.4182C25.0664 13.7215 24.5808 13.9496 24.0214 13.938L6.73313 13.5793C6.44999 13.5734 6.21734 13.4503 6.08611 13.3011C5.96837 13.1673 5.93284 13.0234 5.98303 12.8567Z" fill="black" />
            <Path d="M6.5 24.5C5.39543 24.5 4.5 25.3954 4.5 26.5C4.5 27.6046 5.39543 28.5 6.5 28.5H21C21.2761 28.5 21.5 28.2761 21.5 28C21.5 27.7239 21.2761 27.5 21 27.5H6.5C5.94772 27.5 5.5 27.0523 5.5 26.5C5.5 25.9477 5.94772 25.5 6.5 25.5H25.5C26.0523 25.5 26.5 25.9477 26.5 26.5C26.5 27.0523 26.0523 27.5 25.5 27.5H23.5C23.2239 27.5 23 27.7239 23 28C23 28.2761 23.2239 28.5 23.5 28.5H25.5C26.6046 28.5 27.5 27.6046 27.5 26.5C27.5 25.3954 26.6046 24.5 25.5 24.5H6.5Z" fill="black" />
            <Path d="M5.33634 16.13C5.64376 16.4095 5.89587 16.5 6.1 16.5C6.30413 16.5 6.55625 16.4095 6.86367 16.13C7.28958 15.7428 7.7708 15.5 8.3 15.5C8.82921 15.5 9.31042 15.7428 9.73634 16.13C10.0438 16.4095 10.2959 16.5 10.5 16.5C10.7041 16.5 10.9562 16.4095 11.2637 16.13C11.6896 15.7428 12.1708 15.5 12.7 15.5C13.2292 15.5 13.7104 15.7428 14.1363 16.13C14.4438 16.4095 14.6959 16.5 14.9 16.5C15.1041 16.5 15.3562 16.4095 15.6637 16.13C16.0896 15.7428 16.5708 15.5 17.1 15.5C17.6292 15.5 18.1104 15.7428 18.5363 16.13C18.8438 16.4095 19.0959 16.5 19.3 16.5C19.5041 16.5 19.7562 16.4095 20.0637 16.13C20.4896 15.7428 20.9708 15.5 21.5 15.5C22.0292 15.5 22.5104 15.7428 22.9363 16.13C23.2438 16.4095 23.4959 16.5 23.7 16.5C23.9041 16.5 24.1562 16.4095 24.4637 16.13C24.8896 15.7428 25.3708 15.5 25.9 15.5C26.4292 15.5 26.9104 15.7428 27.3363 16.13C27.5407 16.3158 27.5557 16.632 27.37 16.8363C27.1842 17.0407 26.868 17.0557 26.6637 16.87C26.3562 16.5905 26.1041 16.5 25.9 16.5C25.6959 16.5 25.4438 16.5905 25.1363 16.87C24.7104 17.2572 24.2292 17.5 23.7 17.5C23.1708 17.5 22.6896 17.2572 22.2637 16.87C21.9562 16.5905 21.7041 16.5 21.5 16.5C21.2959 16.5 21.0438 16.5905 20.7363 16.87C20.3104 17.2572 19.8292 17.5 19.3 17.5C18.7708 17.5 18.2896 17.2572 17.8637 16.87C17.5562 16.5905 17.3041 16.5 17.1 16.5C16.8959 16.5 16.6438 16.5905 16.3363 16.87C15.9104 17.2572 15.4292 17.5 14.9 17.5C14.3708 17.5 13.8896 17.2572 13.4637 16.87C13.1562 16.5905 12.9041 16.5 12.7 16.5C12.4959 16.5 12.2438 16.5905 11.9363 16.87C11.5104 17.2572 11.0292 17.5 10.5 17.5C9.9708 17.5 9.48958 17.2572 9.06367 16.87C8.75625 16.5905 8.50413 16.5 8.3 16.5C8.09587 16.5 7.84376 16.5905 7.53634 16.87C7.11043 17.2572 6.62921 17.5 6.1 17.5C5.5708 17.5 5.08958 17.2572 4.66367 16.87C4.45934 16.6842 4.44428 16.368 4.63003 16.1637C4.81579 15.9593 5.13201 15.9443 5.33634 16.13Z" fill="black" />
            <Path d="M6.5 20C6.5 19.7239 6.72386 19.5 7 19.5H26C26.2761 19.5 26.5 19.2761 26.5 19C26.5 18.7239 26.2761 18.5 26 18.5H7C6.17158 18.5 5.5 19.1716 5.5 20C5.5 20.8284 6.17158 21.5 7 21.5H25C25.2761 21.5 25.5 21.7239 25.5 22C25.5 22.2761 25.2761 22.5 25 22.5H6C5.72386 22.5 5.5 22.7239 5.5 23C5.5 23.2761 5.72386 23.5 6 23.5H25C25.8284 23.5 26.5 22.8284 26.5 22C26.5 21.1716 25.8284 20.5 25 20.5H7C6.72386 20.5 6.5 20.2761 6.5 20Z" fill="black" />
            <Path d="M12.3536 9.15356C12.1583 8.9583 12.1583 8.64172 12.3536 8.44645L13.0607 7.73935C13.2559 7.54408 13.5725 7.54408 13.7678 7.73935C13.963 7.93461 13.963 8.25119 13.7678 8.44645L13.0607 9.15356C12.8654 9.34882 12.5488 9.34882 12.3536 9.15356Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M9.75355 10.7607C9.55829 10.9559 9.55829 11.2725 9.75355 11.4678C9.94881 11.663 10.2654 11.663 10.4607 11.4678L11.1678 10.7607C11.363 10.5654 11.363 10.2488 11.1678 10.0536C10.9725 9.85829 10.6559 9.85829 10.4607 10.0536L9.75355 10.7607Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M12.7535 11.7607C12.5583 11.9559 12.5583 12.2725 12.7535 12.4678C12.9488 12.663 13.2654 12.663 13.4607 12.4678L14.1678 11.7607C14.363 11.5654 14.363 11.2488 14.1678 11.0536C13.9725 10.8583 13.6559 10.8583 13.4607 11.0536L12.7535 11.7607Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M15.7535 8.76066C15.5583 8.95592 15.5583 9.27251 15.7535 9.46777C15.9488 9.66303 16.2654 9.66303 16.4607 9.46777L17.1678 8.76066C17.363 8.5654 17.363 8.24882 17.1678 8.05356C16.9725 7.85829 16.6559 7.85829 16.4607 8.05356L15.7535 8.76066Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M18.7535 10.4678C18.5583 10.2725 18.5583 9.95592 18.7535 9.76066L19.4607 9.05356C19.6559 8.85829 19.9725 8.85829 20.1678 9.05356C20.363 9.24882 20.363 9.5654 20.1678 9.76066L19.4607 10.4678C19.2654 10.663 18.9488 10.663 18.7535 10.4678Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M20.7535 11.7607C20.5583 11.9559 20.5583 12.2725 20.7535 12.4678C20.9488 12.663 21.2654 12.663 21.4607 12.4678L22.1678 11.7607C22.363 11.5654 22.363 11.2488 22.1678 11.0536C21.9725 10.8583 21.6559 10.8583 21.4607 11.0536L20.7535 11.7607Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M16.3536 12.7678C16.1583 12.5725 16.1583 12.2559 16.3536 12.0607L17.0607 11.3536C17.2559 11.1583 17.5725 11.1583 17.7678 11.3536C17.963 11.5488 17.963 11.8654 17.7678 12.0607L17.0607 12.7678C16.8654 12.963 16.5488 12.963 16.3536 12.7678Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.71239 14.5791C5.60806 14.5562 4.70704 13.6261 5.02549 12.5684C5.17539 12.0705 5.37823 11.5832 5.63252 11.1118C6.21519 10.0317 7.0566 9.05679 8.10872 8.24271C9.16083 7.42864 10.403 6.79133 11.7644 6.36719C13.1258 5.94304 14.5797 5.74037 16.0431 5.77073C17.5065 5.80109 18.9507 6.0639 20.2934 6.54415C21.636 7.0244 22.8507 7.71268 23.8681 8.56969C24.8856 9.42671 25.6858 10.4357 26.2232 11.539C26.3085 11.7142 26.387 11.8912 26.4584 12.0698C27.0741 13.608 25.6571 14.9721 24.0006 14.9378L6.71239 14.5791ZM5.98303 12.8567C6.11303 12.4249 6.28963 11.9999 6.51262 11.5866C7.02356 10.6395 7.76965 9.76946 8.72067 9.03361C9.67197 8.29754 10.806 7.71319 12.0619 7.32192C13.3176 6.9307 14.6639 6.74233 16.0224 6.77052C17.3809 6.7987 18.7182 7.04276 19.9566 7.48573C21.1951 7.92875 22.304 8.55963 23.2239 9.33452C24.1436 10.1092 24.8529 11.0094 25.3242 11.9769C25.399 12.1305 25.4676 12.2855 25.53 12.4414C25.6799 12.8158 25.5979 13.141 25.344 13.4182C25.0664 13.7215 24.5808 13.9496 24.0214 13.938L6.73313 13.5793C6.44999 13.5734 6.21734 13.4503 6.08611 13.3011C5.96837 13.1673 5.93284 13.0234 5.98303 12.8567Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M6.5 24.5C5.39543 24.5 4.5 25.3954 4.5 26.5C4.5 27.6046 5.39543 28.5 6.5 28.5H21C21.2761 28.5 21.5 28.2761 21.5 28C21.5 27.7239 21.2761 27.5 21 27.5H6.5C5.94772 27.5 5.5 27.0523 5.5 26.5C5.5 25.9477 5.94772 25.5 6.5 25.5H25.5C26.0523 25.5 26.5 25.9477 26.5 26.5C26.5 27.0523 26.0523 27.5 25.5 27.5H23.5C23.2239 27.5 23 27.7239 23 28C23 28.2761 23.2239 28.5 23.5 28.5H25.5C26.6046 28.5 27.5 27.6046 27.5 26.5C27.5 25.3954 26.6046 24.5 25.5 24.5H6.5Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M5.33634 16.13C5.64376 16.4095 5.89587 16.5 6.1 16.5C6.30413 16.5 6.55625 16.4095 6.86367 16.13C7.28958 15.7428 7.7708 15.5 8.3 15.5C8.82921 15.5 9.31042 15.7428 9.73634 16.13C10.0438 16.4095 10.2959 16.5 10.5 16.5C10.7041 16.5 10.9562 16.4095 11.2637 16.13C11.6896 15.7428 12.1708 15.5 12.7 15.5C13.2292 15.5 13.7104 15.7428 14.1363 16.13C14.4438 16.4095 14.6959 16.5 14.9 16.5C15.1041 16.5 15.3562 16.4095 15.6637 16.13C16.0896 15.7428 16.5708 15.5 17.1 15.5C17.6292 15.5 18.1104 15.7428 18.5363 16.13C18.8438 16.4095 19.0959 16.5 19.3 16.5C19.5041 16.5 19.7562 16.4095 20.0637 16.13C20.4896 15.7428 20.9708 15.5 21.5 15.5C22.0292 15.5 22.5104 15.7428 22.9363 16.13C23.2438 16.4095 23.4959 16.5 23.7 16.5C23.9041 16.5 24.1562 16.4095 24.4637 16.13C24.8896 15.7428 25.3708 15.5 25.9 15.5C26.4292 15.5 26.9104 15.7428 27.3363 16.13C27.5407 16.3158 27.5557 16.632 27.37 16.8363C27.1842 17.0407 26.868 17.0557 26.6637 16.87C26.3562 16.5905 26.1041 16.5 25.9 16.5C25.6959 16.5 25.4438 16.5905 25.1363 16.87C24.7104 17.2572 24.2292 17.5 23.7 17.5C23.1708 17.5 22.6896 17.2572 22.2637 16.87C21.9562 16.5905 21.7041 16.5 21.5 16.5C21.2959 16.5 21.0438 16.5905 20.7363 16.87C20.3104 17.2572 19.8292 17.5 19.3 17.5C18.7708 17.5 18.2896 17.2572 17.8637 16.87C17.5562 16.5905 17.3041 16.5 17.1 16.5C16.8959 16.5 16.6438 16.5905 16.3363 16.87C15.9104 17.2572 15.4292 17.5 14.9 17.5C14.3708 17.5 13.8896 17.2572 13.4637 16.87C13.1562 16.5905 12.9041 16.5 12.7 16.5C12.4959 16.5 12.2438 16.5905 11.9363 16.87C11.5104 17.2572 11.0292 17.5 10.5 17.5C9.9708 17.5 9.48958 17.2572 9.06367 16.87C8.75625 16.5905 8.50413 16.5 8.3 16.5C8.09587 16.5 7.84376 16.5905 7.53634 16.87C7.11043 17.2572 6.62921 17.5 6.1 17.5C5.5708 17.5 5.08958 17.2572 4.66367 16.87C4.45934 16.6842 4.44428 16.368 4.63003 16.1637C4.81579 15.9593 5.13201 15.9443 5.33634 16.13Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
            <Path d="M6.5 20C6.5 19.7239 6.72386 19.5 7 19.5H26C26.2761 19.5 26.5 19.2761 26.5 19C26.5 18.7239 26.2761 18.5 26 18.5H7C6.17158 18.5 5.5 19.1716 5.5 20C5.5 20.8284 6.17158 21.5 7 21.5H25C25.2761 21.5 25.5 21.7239 25.5 22C25.5 22.2761 25.2761 22.5 25 22.5H6C5.72386 22.5 5.5 22.7239 5.5 23C5.5 23.2761 5.72386 23.5 6 23.5H25C25.8284 23.5 26.5 22.8284 26.5 22C26.5 21.1716 25.8284 20.5 25 20.5H7C6.72386 20.5 6.5 20.2761 6.5 20Z" stroke="white" stroke-width="2" Mask="url(#Path-1-inside-1_10_180)" />
        </Svg>
    )
}

export default BurgerIcon