'use client';

import {useMutation, useQuery} from "convex/react";
import Image from "next/image";
import styles from "./page.module.css";
import {useState} from "react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	const [text, setText] = useState('');
	const createTodo = useMutation(api.todos.createTodo);
	const todos = useQuery(api.todos.getTodos);
	
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className="flex flex-col space-y-4 p-4">
					{todos?.map(todo => {
						return <div key={todo._id} className="text-lg">
							{todo.text}
						</div>
					})}
				</div>
				<div className="flex items-center space-x-2">
					<form onSubmit={e => {
						e.preventDefault();
						createTodo({
							text
						});
						setText('');
					}}>
						<Input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2 border rounded"></Input>
						<Button variant="default">Create</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
