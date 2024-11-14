import CardSkeleton from './card-skeleton'

const CardSkeletonList = ({number}) => {
    return (
        <>
            {new Array(number).fill(0).map((_ , i)=><CardSkeleton />)}
        
        </>
    )
}

export default CardSkeletonList