const PostCreatedAt = ({ createdAt }: { createdAt: string | Date }) => (
    <p>
        <strong>Created At:</strong>
        {createdAt.toLocaleString()}
    </p>
)

export default PostCreatedAt