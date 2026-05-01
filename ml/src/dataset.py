import torch
from datasets import load_dataset
from transformers import DistilBertTokenizerFast

class SentimentDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

def prepare_data(config):
    # Load Sentiment140
    dataset = load_dataset(config['data']['dataset'], split='train')
    
    # Subsample for training/val/test
    total_size = config['data']['train_size'] + config['data']['val_size'] + config['data']['test_size']
    dataset = dataset.shuffle(seed=42).select(range(total_size))
    
    # Map labels: 0 -> 0 (Negative), 4 -> 2 (Positive)
    # We will "simulate" neutral samples (1) by taking some positive/negative samples 
    # and assigning them to neutral, or using borderline confidence if we had a model.
    # For initial training, we'll map a small portion to Neutral for class balance.
    
    texts = dataset['text']
    original_labels = dataset['sentiment']
    
    mapped_labels = []
    for i, label in enumerate(original_labels):
        if i % 10 == 0: # Mocking NEUTRAL every 10th sample for 3-class distribution
            mapped_labels.append(1)
        elif label == 0:
            mapped_labels.append(0)
        else: # label == 4
            mapped_labels.append(2)
            
    tokenizer = DistilBertTokenizerFast.from_pretrained(config['model']['name'])
    
    def tokenize_and_split(texts, labels, start, end):
        subset_texts = texts[start:end]
        subset_labels = labels[start:end]
        encodings = tokenizer(subset_texts, truncation=True, padding='max_length', max_length=config['training']['max_length'])
        return SentimentDataset(encodings, subset_labels)

    train_end = config['data']['train_size']
    val_end = train_end + config['data']['val_size']
    test_end = val_end + config['data']['test_size']

    train_dataset = tokenize_and_split(texts, mapped_labels, 0, train_end)
    val_dataset = tokenize_and_split(texts, mapped_labels, train_end, val_end)
    test_dataset = tokenize_and_split(texts, mapped_labels, val_end, test_end)

    return train_dataset, val_dataset, test_dataset, tokenizer
