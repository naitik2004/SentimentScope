import yaml
import wandb
from transformers import Trainer, TrainingArguments
from dataset import prepare_data
from model import get_model, save_model
from evaluate import compute_metrics
import os

def train():
    # Load config
    with open('ml/configs/training_config.yaml', 'r') as f:
        config = yaml.safe_load(f)

    # Initialize wandb
    wandb.init(project="sentimentscope", config=config)

    # Prepare data
    train_dataset, val_dataset, test_dataset, tokenizer = prepare_data(config)

    # Get model
    model = get_model(config['model']['name'], config['model']['num_labels'])

    # Training arguments
    training_args = TrainingArguments(
        output_dir=config['output']['checkpoint_dir'],
        num_train_epochs=config['training']['epochs'],
        per_device_train_batch_size=config['training']['batch_size'],
        per_device_eval_batch_size=config['training']['batch_size'],
        learning_rate=float(config['training']['learning_rate']),
        warmup_steps=config['training']['warmup_steps'],
        weight_decay=config['training']['weight_decay'],
        logging_dir='./logs',
        logging_steps=100,
        evaluation_strategy='epoch',
        save_strategy='epoch',
        load_best_model_at_end=True,
        metric_for_best_model='f1',
        report_to='wandb',
    )

    # Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics,
    )

    # Train
    trainer.train()

    # Evaluate on test set
    test_results = trainer.evaluate(test_dataset)
    print(f"Test Results: {test_results}")

    # Save final model
    save_model(model, tokenizer, os.path.join(config['output']['checkpoint_dir'], 'final_model'))

if __name__ == "__main__":
    train()
