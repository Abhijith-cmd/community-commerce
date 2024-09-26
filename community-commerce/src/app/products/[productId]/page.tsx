export default function ProdctDetails({ params }: {
    params: { productId: string }
}) {
    return (
        <div>
            product Details for {params.productId}
        </div>
    )
}