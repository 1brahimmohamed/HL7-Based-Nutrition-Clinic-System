import os
import cv2
import numpy as np
from sklearn.feature_extraction import image
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import pairwise_distances_argmin_min
from shutil import copyfile

# Step 1: Feature Extraction
def extract_features(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Read image in grayscale
    img = cv2.resize(img, (256, 256))  # Resize image for consistency
    return img.flatten()  # Flatten the image to a 1D array

# Step 2: Load and Extract Features for all Images
image_folder = "C:/Users/I1bra/Downloads/archive (1)/The IQ-OTHNCCD lung cancer dataset/Normal cases"
image_files = os.listdir(image_folder)
image_features = [extract_features(os.path.join(image_folder, img)) for img in image_files]

# Step 3: Clustering
n_clusters = 55  # Number of clusters (you can adjust this)
clusterer = AgglomerativeClustering(n_clusters=n_clusters, linkage='ward')
cluster_labels = clusterer.fit_predict(image_features)

# Step 4: Save Clustered Images into Separate Folders
output_folder = "./Clustered_Normal_cases/"
for cluster_idx in range(n_clusters):
    cluster_images = [image_files[i] for i, label in enumerate(cluster_labels) if label == cluster_idx]
    cluster_folder = os.path.join(output_folder, f"cluster_{cluster_idx}")
    os.makedirs(cluster_folder, exist_ok=True)
    for img_name in cluster_images:
        src_path = os.path.join(image_folder, img_name)
        dst_path = os.path.join(cluster_folder, img_name)
        copyfile(src_path, dst_path)
