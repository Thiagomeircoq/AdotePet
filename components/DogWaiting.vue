<template>
    <div class="dog">
        <div class="dog__paws">
            <div class="dog__bl-leg leg">
                <div class="dog__bl-paw paw"></div>
                <div class="dog__bl-top top"></div>
            </div>
            <div class="dog__fl-leg leg">
                <div class="dog__fl-paw paw"></div>
                <div class="dog__fl-top top"></div>
            </div>
            <div class="dog__fr-leg leg">
                <div class="dog__fr-paw paw"></div>
                <div class="dog__fr-top top"></div>
            </div>
        </div>
        <div class="dog__body">
            <div class="dog__tail"></div>
        </div>
        <div class="dog__head">
            <div class="dog__snout">
                <div class="dog__nose"></div>
                <div class="dog__eyes">
                    <div class="dog__eye-l"></div>
                    <div class="dog__eye-r"></div>
                </div>
            </div>
        </div>
        <div class="dog__head-c">
            <div class="dog__ear-l"></div>
            <div class="dog__ear-r"></div>
        </div>
    </div>
</template>
<style>
.leg {
    position: absolute;
    bottom: 0;
    width: 3rem;
    height: 4.125rem;
}

.paw {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3.75rem;
    height: 1.875rem;
    overflow: hidden;
}

.paw::before {
    content: "";
    position: absolute;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
}

.top {
    position: absolute;
    bottom: 0;
    left: 0.75rem;
    height: 4.5rem;
    width: 2.625rem;
    border-top-left-radius: 1.425rem;
    border-top-right-radius: 1.425rem;
    transform-origin: bottom right;
    transform: rotateZ(90deg) translateX(-0.1rem) translateY(1.5rem);
    z-index: -1;
    background-image: linear-gradient(70deg, transparent 20%, #ff8b56 20%);
}

.dog {
    position: relative;
    width: 22.5rem;
    height: 8.25rem;
    z-index: 1;
}

.dog::before {
    content: "";
    position: absolute;
    bottom: -0.75rem;
    right: -0.15rem;
    width: 100%;
    height: 1.5rem;
    background-color: rgba(28, 49, 48, 0.1);
    border-radius: 50%;
    z-index: -1000;
    animation: shadow 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__head {
    position: absolute;
    left: 1.5rem;
    bottom: 0;
    width: 9.75rem;
    height: 8.25rem;
    border-top-left-radius: 4.05rem;
    border-top-right-radius: 4.05rem;
    border-bottom-right-radius: 3.3rem;
    border-bottom-left-radius: 3.3rem;
    background-color: #ff8147;
    animation: head 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__head-c {
    position: absolute;
    left: 1.5rem;
    bottom: 0;
    width: 9.75rem;
    height: 8.25rem;
    animation: head 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
    z-index: -1;
}

.dog__snout {
    position: absolute;
    left: -1.5rem;
    bottom: 0;
    width: 7.5rem;
    height: 3.75rem;
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    border-bottom-left-radius: 4.5rem;
    background-color: #d7dbd2;
    animation: snout 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__snout::before {
    content: "";
    position: absolute;
    left: -0.1125rem;
    top: -0.15rem;
    width: 1.875rem;
    height: 1.125rem;
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    border-bottom-left-radius: 4.5rem;
    background-color: #1c3130;
    animation: snout-b 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__nose {
    position: absolute;
    top: -1.95rem;
    left: 40%;
    width: 0.75rem;
    height: 2.4rem;
    border-radius: 0.525rem;
    transform-origin: bottom;
    transform: rotateZ(10deg);
    background-color: #d7dbd2;
}

.dog__eye-l,
.dog__eye-r {
    position: absolute;
    top: -0.9rem;
    width: 0.675rem;
    height: 0.375rem;
    border-radius: 50%;
    background-color: #1c3130;
    animation: eye 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__eye-l {
    left: 27%;
}

.dog__eye-r {
    left: 65%;
}

.dog__ear-l,
.dog__ear-r {
    position: absolute;
    width: 10.5rem;
    height: 3.375rem;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 3.3rem;
    border-bottom-left-radius: 3.3rem;
    background-color: #e26538;
}

.dog__ear-l {
    top: 1.5rem;
    left: 6rem;
    transform-origin: bottom left;
    transform: rotateZ(-50deg);
    z-index: -1;
    animation: ear-l 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__ear-r {
    top: 1.5rem;
    right: 3rem;
    transform-origin: bottom right;
    transform: rotateZ(20deg);
    z-index: -2;
    animation: ear-r 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__body {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    bottom: 0.3rem;
    left: 3.75rem;
    width: 18.75rem;
    height: 7.2rem;
    border-top-left-radius: 3rem;
    border-top-right-radius: 6rem;
    border-bottom-right-radius: 1.5rem;
    border-bottom-left-radius: 6rem;
    background-color: #ff702e;
    z-index: -2;
    animation: body 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
}

.dog__tail {
    position: absolute;
    right: -3rem;
    height: 1.5rem;
    width: 4.5rem;
    background-color: #e96839;
    border-radius: 1.5rem;
}

.dog__paws {
    position: absolute;
    bottom: 0;
    left: 7.5rem;
    width: 12rem;
    height: 3rem;
}

.dog__bl-leg {
    left: -3rem;
    z-index: -10;
}

.dog__bl-paw::before {
    background-color: #bec4b6;
}

.dog__bl-top {
    background-image: linear-gradient(80deg, transparent 20%, #e96839 20%);
}

.dog__fl-leg {
    z-index: 10;
}

.dog__fl-leg {
    left: 0;
}

.dog__fl-paw::before {
    background-color: #d7dbd2;
}

.dog__fr-leg {
    right: 0;
}

.dog__fr-paw::before {
    background-color: #d7dbd2;
}


@keyframes head {

    0%,
    10%,
    20%,
    26%,
    28%,
    90%,
    100% {
        height: 8.25rem;
        bottom: 0;
        transform-origin: bottom right;
        transform: rotateZ(0);
    }

    5%,
    15%,
    22%,
    24%,
    30% {
        height: 8.1rem;
    }

    32%,
    50% {
        height: 8.25rem;
    }

    55%,
    60% {
        bottom: 0.75rem;
        transform-origin: bottom right;
        transform: rotateZ(0);
    }

    70%,
    80% {
        bottom: 0.75rem;
        transform-origin: bottom right;
        transform: rotateZ(10deg);
    }
}

@keyframes body {

    0%,
    10%,
    20%,
    26%,
    28%,
    32%,
    100% {
        height: 7.2rem;
    }

    5%,
    15%,
    22%,
    24%,
    30% {
        height: 7.05rem;
    }
}

@keyframes ear-l {

    0%,
    10%,
    20%,
    26%,
    28%,
    82%,
    100% {
        transform: rotateZ(-50deg);
    }

    5%,
    15%,
    22%,
    24% {
        transform: rotateZ(-48deg);
    }

    30%,
    31% {
        transform: rotateZ(-30deg);
    }

    32%,
    80% {
        transform: rotateZ(-60deg);
    }
}

@keyframes ear-r {

    0%,
    10%,
    20%,
    26%,
    28% {
        transform: rotateZ(20deg);
    }

    5%,
    15%,
    22%,
    24% {
        transform: rotateZ(18deg);
    }

    30%,
    31% {
        transform: rotateZ(10deg);
    }

    32% {
        transform: rotateZ(25deg);
    }
}

@keyframes snout {

    0%,
    10%,
    20%,
    26%,
    28%,
    82%,
    100% {
        height: 3.75rem;
    }

    5%,
    15%,
    22%,
    24% {
        height: 3.45rem;
    }
}

@keyframes snout-b {

    0%,
    10%,
    20%,
    26%,
    28%,
    98%,
    100% {
        width: 1.875rem;
    }

    5%,
    15%,
    22%,
    24% {
        width: 1.8rem;
    }

    34%,
    98% {
        width: 1.275rem;
    }
}

@keyframes shadow {

    0%,
    10%,
    20%,
    26%,
    28%,
    30%,
    84%,
    100% {
        width: 99%;
    }

    5%,
    15%,
    22%,
    24% {
        width: 101%;
    }

    34%,
    81% {
        width: 96%;
    }
}

@keyframes eye {

    0%,
    30% {
        width: 0.675rem;
        height: 0.3rem;
    }

    32%,
    59%,
    90%,
    100% {
        width: 0.525rem;
        height: 0.525rem;
        transform: translateY(0);
    }

    60%,
    75% {
        transform: translateY(-0.3rem);
    }

    80%,
    85% {
        transform: translateY(0.15rem);
    }
}
</style>