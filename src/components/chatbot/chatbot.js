// src/components/Chatbot.js
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice';
import ReactMarkdown from 'react-markdown'; // 👈 Install via npm install react-markdown

const Chatbot = () => {
	const user = useSelector(selectUser);
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ sender: 'bot', text: 'Hi! I’m PetBot 🐾. Ask me about pets!' }
	]);
	const [input, setInput] = useState('');

	if (!user) return null; // 🔒 Protected: don’t render chatbot if not logged in

	const handleSend = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;

		const newUserMessage = { text: input, sender: 'user' };
		setMessages((prev) => [...prev, newUserMessage]);
		setInput('');

		try {
			const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sender: user.id,
					message: input,
				}),
			});

			const data = await response.json();

			const botResponses = data.map((msg) => ({
				text: msg.text,
				sender: 'bot',
			}));

			setMessages((prev) => [...prev, ...botResponses]);
		} catch (err) {
			setMessages((prev) => [...prev, { text: 'Bot is offline.', sender: 'bot' }]);
		}
	};

	return (
		<div className={`chatbot ${isOpen ? 'chatbot--open' : ''}`}>
			<button className="chatbot__toggle" onClick={() => setIsOpen(!isOpen)}>
				💬
			</button>
			{isOpen && (
				<div className="chatbot__window">
					<div className="chatbot__messages">
						{messages.map((msg, index) => (
							<div key={index} className={`chatbot__message chatbot__message--${msg.sender}`}>
								<ReactMarkdown>{msg.text || ''}</ReactMarkdown>
							</div>
						))}
					</div>
					<form className="chatbot__form" onSubmit={handleSend}>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Ask me something..."
							className="chatbot__input"
						/>
						<button type="submit" className="chatbot__send">→</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Chatbot;
