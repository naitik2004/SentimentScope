from transformers import AutoModelForSequenceClassification, AutoConfig
import os

def get_model(model_name, num_labels):
    id2label = {0: 'NEGATIVE', 1: 'NEUTRAL', 2: 'POSITIVE'}
    label2id = {'NEGATIVE': 0, 'NEUTRAL': 1, 'POSITIVE': 2}
    
    config = AutoConfig.from_pretrained(
        model_name,
        num_labels=num_labels,
        id2label=id2label,
        label2id=label2id
    )
    
    model = AutoModelForSequenceClassification.from_pretrained(
        model_name,
        config=config
    )
    return model

def save_model(model, tokenizer, path):
    if not os.path.exists(path):
        os.makedirs(path)
    model.save_pretrained(path)
    tokenizer.save_pretrained(path)

def load_model(path):
    model = AutoModelForSequenceClassification.from_pretrained(path)
    return model
