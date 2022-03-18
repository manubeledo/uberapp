import React from 'react'
import tw from "tailwind-styled-components"
import { carList } from '../data/carList'

const RideSelector = () => {
    return (
        <Wrapper>
            <Title> Choose a ride, or swipe up for more </Title>
            <CarList>
                { carList.map((car, index)=>
                    <Car key={index}>
                        <CarImage src={car.imgUrl}/>
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>{Math.floor(5*car.multiplier)} min away</Time>
                        </CarDetails>
                        <Price>{'$' + Math.floor(24*car.multiplier)}</Price>
                    </Car>
                )}

            </CarList>
        </Wrapper>
    )
}

export default RideSelector

const Wrapper = tw.div`
flex-1 overflow-y-scroll
`
const Title = tw.div`
bg-gray-200 text-center text-sm py-2 border-b-2 border-gray-400
`
const CarList = tw.div`
flex flex-col h-1/2
`
const Car = tw.div`
flex p-4 items-center
`
const CarImage = tw.img`
h-14 mx-2
`
const CarDetails = tw.div`
flex-1 flex-col
`

const Service = tw.div`
flex 
`

const Time = tw.div`
text-sm text-blue-500
`

const Price = tw.div`
text-sm mr-4
`