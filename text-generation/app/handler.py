import json
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
#NousResearch/llama-2-7b-chat-hf
#https://www.youtube.com/watch?v=stD47vPDadI

# model = AutoModelForCausalLM.from_pretrained(model_path)
# tokenizer = AutoTokenizer.from_pretrained(model_path)

en_fr_translator = pipeline('translation_en_to_fr')

#gen = pipeline('text-generation', model=model, tokenizer=tokenizer)

# from transformers import pipeline, TextStreamer

# streamer = TextStreamer(tokenizer, skip_prompt=True)

# pipe = pipeline("text-generation",
# model=model,
# tokenizer= tokenizer,
# torch_dtype=torch.bfloat16,
# device_map="auto",
# max_new_tokens = 512,
# do_sample=True,
# top_k=10,
# num_return_sequences=1,
# streamer=streamer,
# eos_token_id=tokenizer.eos_token_id
# )

def handler(event, context):
    response = {
        "statusCode": 200,
        "body": en_fr_translator(event['text'])[0]
        #"body": gen(event['text'])[0]['generated_text']
    }
    return response