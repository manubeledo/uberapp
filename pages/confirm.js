import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import { useRouter } from 'next/router'
import RideSelector from './components/RideSelector'
import Link from 'next/link'


const token = 'pk.eyJ1IjoiYmlvbG9naWNhbGx5dW5pcXVlIiwiYSI6ImNreDJub25ndzFrbGsyb3BodXZjaW0xNGgifQ.fbR8GLAly4zjMNifV3-g-g';

const Confirm = () => {
    const router = useRouter()
    const { pickup, dropoff } = router.query

    const [ pickUpCoordinates, setPickUpCoordintes ] = useState()
    const [ DropOffCoordinates, setDropOffCoordintes ] = useState()

    console.log("PickUp", pickup)
    console.log("Dropoff", dropoff)

    const getPickUpCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
            setPickUpCoordintes(data.features[0].geometry.coordinates)
        })
    }

    const getDropOffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
            setDropOffCoordintes(data.features[0].geometry.coordinates)
        })
    }

    useEffect(()=> {
        getPickUpCoordinates(pickup);
        getDropOffCoordinates(dropoff);
    }, [ pickup, dropoff ])

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href='/search'>
                <BackButton src='https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-256.png' />
                </Link>
            </ButtonContainer>
            <Map 
                pickUpCoordinates={pickUpCoordinates}
                DropOffCoordinates={DropOffCoordinates}
            />

            <UbersTypes>
            <RideSelector/>
            <ConfirmButtonContainer>
                Confirm UberX
            </ConfirmButtonContainer>
            </UbersTypes>   
        </Wrapper>
    )
}

export default Confirm

const Wrapper = tw.div`
flex flex-col h-screen
`
const UbersTypes = tw.div`
flex-1 flex flex-col bg-gray-200  h-1/2
`
const ConfirmButtonContainer = tw.button`
bg-black text-white m-2 p-4 text-center rounded
`
const BackButton = tw.img`
w-10 h-full object-contain
`
const ButtonContainer = tw.div`
absolute top-4 left-4 z-10 bg-white rounded-full shodow-md hover:cursor-pointer
`