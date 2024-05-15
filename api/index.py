from openai.types.chat.chat_completion import ChatCompletion
from fastapi import FastAPI
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os

_: bool = load_dotenv(find_dotenv())  # read local .env file

api_key = os.getenv("OPEN_AI_KEY")

client: OpenAI = OpenAI(api_key=api_key)


app = FastAPI()


# def chat_completion( prompt:str, prompt2: str) -> str:


def generate_description(prompt: str) -> str:
    messages3 = [
        {
            "role": "system",
            "content": "You are very helpful when people ask you about any problem and task, generate 5 most useful advices about that topic in a ordered list manner line by line.",
        },
        {"role": "user", "content": prompt},
    ]

    response: ChatCompletion = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages3, # type: ignore
    )

    return response.choices[0].message.content  # type: ignore


from pydantic import BaseModel


class Problem(BaseModel):
    Title: str
    detail: str


@app.post("/api/product_description")
async def generate_product_description(prob: Problem):
    description = generate_description(
        f"problem title: {prob.Title}, problem detail : {prob.detail}"
    )
    return {"PROBLEM SOLUTION ": description}
