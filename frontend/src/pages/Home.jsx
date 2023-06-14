import React, { Component } from 'react'
import AwesomeSlider from 'react-awesome-slider'

// Carousel
import AwsSliderStyles from 'react-awesome-slider/src/styles';
import Saxo from '../assets/img/saxo_bank_wall.webp'
import Paris from '../assets/img/paris_wall.webp'
import Mountain from '../assets/img/mountain_wall.webp'

// Articles
import { Articles } from '../components/main/Articles'
// scss
import '../assets/sass/main/Home.scss'


function Slider() {
    return (
        <AwesomeSlider cssModule={AwsSliderStyles}>
            <div data-src={Saxo} />
            <div data-src={Paris} />
            <div data-src={Mountain} />
        </AwesomeSlider>
    )
}

export default class Home extends Component {
    render() {
        return (
            <>
            <h1 className="text-center text-uppercase">investor home</h1>

            <div className="position-relative pb-4 mt-4 container"><Slider /></div>
            <div className="position-relative mt-4 pb-4"><Articles /></div>
            </>
        )
    }
}
