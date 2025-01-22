import pandas as pd
from typing import Union, Optional

class DataCleaner:
    def __init__(self):
        self.data = None
        
    def load_data(self, 
                 file_path: str, 
                 file_type: str = 'csv',
                 **kwargs) -> pd.DataFrame:
        """
        Load data from various file formats
        """
        if file_type.lower() == 'csv':
            self.data = pd.read_csv(file_path, **kwargs)
        elif file_type.lower() == 'excel':
            self.data = pd.read_excel(file_path, **kwargs)
        elif file_type.lower() == 'json':
            self.data = pd.read_json(file_path, **kwargs)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")
        
        return self.data
    
    def remove_duplicates(self, subset: Optional[list] = None) -> pd.DataFrame:
        """
        Remove duplicate rows from the dataset
        """
        self.data = self.data.drop_duplicates(subset=subset)
        return self.data
    
    def handle_missing_values(self,
                            method: str = 'drop',
                            fill_value: Optional[Union[str, int, float]] = None) -> pd.DataFrame:
        """
        Handle missing values in the dataset
        """
        if method == 'drop':
            self.data = self.data.dropna()
        elif method == 'fill':
            self.data = self.data.fillna(fill_value)
        else:
            raise ValueError(f"Unsupported method: {method}")
            
        return self.data
    
    def save_cleaned_data(self,
                         output_path: str,
                         file_type: str = 'csv',
                         **kwargs) -> None:
        """
        Save the cleaned dataset
        """
        if file_type.lower() == 'csv':
            self.data.to_csv(output_path, index=False, **kwargs)
        elif file_type.lower() == 'excel':
            self.data.to_excel(output_path, index=False, **kwargs)
        elif file_type.lower() == 'json':
            self.data.to_json(output_path, **kwargs)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")