import { useState } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/link'

const Search = () => {

    const [ pickup, setPickup ] = useState("")
    const [ dropoff, setDropoff ] = useState("")

    // console.log(pickup)
    // console.log(dropoff)

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
                />
                <Input 
                placeholder='Where to?'
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                />
            </InputBoxes>
            <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png"/>
        </InputContainer>

        <SavedPlaces>
            <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"/>
            Saved Places
        </SavedPlaces>

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