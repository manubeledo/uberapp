import { useState, useEffect } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/link'

const token = 'pk.eyJ1IjoiYmlvbG9naWNhbGx5dW5pcXVlIiwiYSI6ImNreDJub25ndzFrbGsyb3BodXZjaW0xNGgifQ.fbR8GLAly4zjMNifV3-g-g';
const ipAPItoken = 'ff485189c77794'

const Search = () => {

    const [city, setCity] = useState("")
    const [search, setSearch] =useState("")

    const [ pickup, setPickup ] = useState("")
    const [ dropoff, setDropoff ] = useState("")

    const [ pickupStates, setPickupStates] = useState([])
    const [ dropoffStates, setDropoffStates] = useState([])
    
    useEffect(() => {
        fetch(`https://ipinfo.io/?token=${ipAPItoken}`)
            .then(response => response.json())
            .then(data => {
            setCity(data.city)
        });
    }, [])

    const getPickUpState = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
            const states = data.features.reduce((newArray, obj) => {
                let placeData = obj.place_name
                if (placeData.includes(city)) {
                    newArray.push(obj.place_name);
                    return newArray;
                }
                else return newArray;
            }, []);
            setPickupStates(states)
        })
    }

    const getDropOffState = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
            const statesDropOff = data.features.reduce((newArray, obj) => {
                let placeData = obj.place_name
                if (placeData.includes(city)) {
                    newArray.push(obj.place_name);
                    return newArray;
                }
                else return newArray;
            }, []);
            setDropoffStates(statesDropOff)
        })
    }

    useEffect(()=> {
        if ((pickup || dropoff) && !pickup.includes(city) && !pickup.includes(city))
        getPickUpState(pickup);
        getDropOffState(dropoff);
    }, [ pickup, dropoff ])


    const handlePickSelection = (option) => {
        setPickup(option);
    }

    const handleDropSelection = (name) => {
        setDropoff(name);
    }

    const handleInputOneClick = (e) => {
        console.log('Hiciste click en el input 1')
        setSearch(1)
    }

    const handleInputTwoClick = (e) => {
        console.log('Hiciste click en el input 2')
        setSearch(2)
    }

    return (
    <Wrapper>
        
        <Link href='/' passHref>
            <ActionButton>
            <BackButton src='https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-256.png' />
            </ActionButton>
        </Link>

        <InputContainer>
            <FromToIcons>
                <Circle src="https://img.icons8.com/ios/50/9CA3AF/filled-circle.png"/>
                <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"/>
                <Square src="https://img.icons8.com/windows/50/000000/square-full.png"/>    
            </FromToIcons>
            <InputBoxes>
                <Input 
                placeholder='Enter pickup location' 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onClick={(e) => handleInputOneClick(e)}
                />
                <Input 
                placeholder='Where to?'
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                onClick={(e) => handleInputTwoClick(e)}
                />
            </InputBoxes>
            <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png"/>
        </InputContainer>

        {search === 1 ?
            <> 
                <List>
                    {
                        pickupStates.map((option, key) => (
                        <Li key={key} onClick={() => handlePickSelection(option)}>
                            <Title>{option.split(",")[0]}</Title>
                            <Subtitle>{option.split(",")[1]}</Subtitle>
                        </Li>
                        ))
                    }
                </List>

                <SavedPlaces>
                    <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"/>
                    Saved Places
                </SavedPlaces>
            </>
            : 
            <>
                <List>
                    {
                        dropoffStates.map((name, key) => (
                        <Li key={key} onClick={() => handleDropSelection(name)}>
                            <Title>{name.split(",")[0]}</Title>
                            <Subtitle>{name.split(",")[1]}</Subtitle>
                        </Li>
                        ))
                    }
                </List>

                <SavedPlaces>
                    <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"/>
                    Saved Places
                </SavedPlaces>
            </>
        }

        <Link href={{
            pathname: '/confirm',
            query: {
                pickup: pickup,
                dropoff: dropoff
            }    
        }} passHref>
        <Confirm>
            Confirm Locations
        </Confirm>
        </Link>

    </Wrapper>
    )
}

export default Search

const Wrapper = tw.div`
bg-gray-200 h-screen flex flex-col
`
const ActionButton = tw.button`
bg-white px-4
`

const BackButton = tw.img`
h-12 cursor-pointer hover:rounded-lg hover:p-px
`
const FromToIcons = tw.div`
w-10 flex flex-col mx-3 items-center
`

const InputContainer = tw.div`
bg-white flex items-center
`

const Circle = tw.img`
w-4
`
const Line = tw.img`
w-10
`
const Square = tw.img`
w-5
`

const InputBoxes = tw.div`
flex flex-col flex-1
`

const Input = tw.input`
h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`
const PlusIcon = tw.img`
h-10 mx-3 bg-gray-200 rounded-full
`
const SavedPlaces = tw.div`
p-2 mt-2 flex justify-center items-center bg-white
`

const Confirm = tw.button`
p-2 bg-black text-white text-center m-2 rounded
`

const StarIcon = tw.img`
bg-gray-400 rounded-full w-10 mr-4 p-2
`
const Select = tw.input`
h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`
const Li = tw.li`
bg-white first:mt-2 border-b border-black mt-0 pt-2 pb-2
`
const List = tw.ul`
`
const Title = tw.h1`
`
const Subtitle = tw.h5``
