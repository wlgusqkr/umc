import CardSkeleton from './card-skeleton'

const CardSkeletonList = ({ number }) => {
  return (
    <>
      {new Array(number).fill(0).map((_, i) => <CardSkeleton key={i}/>)}

    </>
  )
}

export default CardSkeletonList