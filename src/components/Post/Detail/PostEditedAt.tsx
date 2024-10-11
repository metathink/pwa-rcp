const PostEditedAt = ({ editedAt }: { editedAt: string | Date | undefined }) => (
    <>
        {editedAt && (
            <p>
                <strong>Edited At:</strong>
                {editedAt.toLocaleString()}
            </p>
        )}
    </>
)

export default PostEditedAt