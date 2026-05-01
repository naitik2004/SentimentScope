from huggingface_hub import HfApi
from model import load_model
from transformers import AutoTokenizer
import os
import yaml

def push_to_hub():
    # Load config
    with open('ml/configs/training_config.yaml', 'r') as f:
        config = yaml.safe_load(f)

    model_path = os.path.join(config['output']['checkpoint_dir'], 'final_model')
    repo_name = config['output']['model_name'] # Usually includes username: user/repo

    print(f"Loading model from {model_path}...")
    model = load_model(model_path)
    tokenizer = AutoTokenizer.from_pretrained(model_path)

    print(f"Pushing to HuggingFace Hub: {repo_name}...")
    model.push_to_hub(repo_name)
    tokenizer.push_to_hub(repo_name)
    
    print("Push complete!")

if __name__ == "__main__":
    # Ensure HF_TOKEN is set in environment
    if "HF_TOKEN" not in os.environ:
        print("Please set HF_TOKEN environment variable.")
    else:
        push_to_hub()
