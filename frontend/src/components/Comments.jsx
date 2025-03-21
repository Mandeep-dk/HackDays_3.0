import React, { useState } from "react";
import pfps from "../assets/Default_image.jpg";

function Comments() {
    // State to store all comments
    const [comments, setComments] = useState([]);

    // State to store the text input from the textarea
    const [commentText, setCommentText] = useState("");

    // Handle textarea value change
    const handleInputChange = (e) => {
        setCommentText(e.target.value); // Update the input value as user types
    };

    // Handle submission of a new comment
    const handleComment = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if the input is not empty or only spaces
        if (commentText.trim()) {
            const newComment = {
                text: commentText, // The comment text
                timestamp: new Date(), // Current timestamp
                user: "You", // Placeholder user name
            };

            // Add the new comment to the existing comments at the top
            setComments([newComment, ...comments]);

            // Clear the textarea after submission
            setCommentText("");
        }
    };

    return (
        <>
            {/* Comment Input Box */}
            {/* Comment Input Box */}
            <form
                className="comment-box flex items-start bg-white rounded-lg shadow-md p-4 gap-3 mt-[10vh] mx-auto"
                onSubmit={handleComment} // Handle form submission
            >
                {/* User avatar */}
                <div className="user flex items-center">
                    <div className="image">
                        <img
                            src={pfps}
                            alt="User Profile Picture"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                </div>

                {/* Textarea for entering a new comment */}
                <textarea
                    name="comment"
                    placeholder="Write your comment..."
                    className="flex-grow border border-gray-300 rounded-md p-2 text-sm resize-none"
                    value={commentText} // Controlled component bound to state
                    onChange={handleInputChange} // Handle input change
                ></textarea>

                {/* Submit button */}
                <button
                    type="submit"
                    className="comment-submit bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mr-[2vh]"
                >
                    Comment
                </button>
            </form>

            {/* Render Comments */}
            <div className="comment-session mx-auto mt-2 max-w-3xl">
                <div className="post-comment mb-3 bg-white rounded-lg w-full shadow-md p-6">
                    <ul>
                        {/* Iterate through the comments state and display each comment */}
                        {comments.map((comment, index) => (
                            <li key={index} className="mb-4">
                                <div className="user flex items-center">
                                    {/* User avatar */}
                                    <div className="user-image mr-3">
                                        <img
                                            src={pfps}
                                            alt="User Profile Picture"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>

                                    {/* Comment metadata */}
                                    <div className="user-meta">
                                        <div className="name text-sm font-semibold uppercase">
                                            {comment.user} {/* Display the user name */}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {comment.timestamp.toLocaleTimeString()} {/* Format the timestamp */}
                                        </div>
                                    </div>
                                </div>

                                {/* Display the comment text */}
                                <p className="pl-14">{comment.text}</p>
                            </li>
                        ))}

                        {/* Example static comments for display */}
                        <li className="mt-4 w-full">
                            <div className="user flex items-center w-full">
                                <div className="user-image mr-3">
                                    <img
                                        src={pfps}
                                        alt="User Profile Picture"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </div>
                                <div className="user-meta w-full">
                                    <div className="name text-sm font-semibold uppercase">anonymous123</div>
                                    <div className="text-xs text-gray-500">5 mins ago</div>
                                </div>
                            </div>
                            <p className="pl-12 w-full">
                            If this actually happens, it’s going to be a disaster for personal freedom. Giving AI and the government full control over our money means they can decide what we can or can’t buy. What about people in rural areas who rely on cash? What if the system glitches or unfairly blocks transactions? This is less about economic stability and more about total financial surveillance. We should have the right to choose how we handle our own money!
                            </p>
                        </li>


                        <li className="mt-4">
                            <div className="user flex items-center">
                                <div className="user-image mr-3">
                                    <img
                                        src={pfps}
                                        alt="User Profile Picture"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </div>
                                <div className="user-meta">
                                    <div className="name text-sm font-semibold uppercase">
                                        Axyon078
                                    </div>
                                    <div className="text-xs text-gray-500">23 mins ago</div>
                                </div>
                            </div>
                            <p className="pl-12">This could actually be a step toward a more transparent and efficient economy. Eliminating black money, tax evasion, and corruption would be a huge win. With AI monitoring transactions, financial crimes could be reduced significantly. Plus, digital currency would make payments faster and more convenient. As long as there are proper safeguards in place to protect privacy, this system could benefit society in the long run.</p>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Comments;
