import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression

product_purchased_time = pd.read_csv("product_purchased_time.csv")

product_purchased_time = product_purchased_time.merge(
    pd.read_csv("product_categories.csv"), on="product_id"
)

total_sales = product_purchased_time["product_id"].count()
unique_products = product_purchased_time["product_id"].unique().shape[0]
days_range = (
    product_purchased_time["product_purchased_time"].max()
    - product_purchased_time["product_purchased_time"].min()
).days
average_sales_per_day = total_sales / days_range

print("Total sales:", total_sales)
print("Unique products:", unique_products)
print("Average sales per day:", average_sales_per_day)


plt.figure()
product_purchased_time["product_purchased_time"].hist()
plt.xlabel("Product Purchased Time")
plt.ylabel("Frequency")
plt.title("Product Sales Distribution")
plt.show()

plt.figure()
product_purchased_time["category"].hist()
plt.xlabel("Category")
plt.ylabel("Frequency")
plt.title("Product Sales by Category")
plt.show()

X_train = product_purchased_time[["product_purchased_time"]]
y_train = product_purchased_time["product_id"]


X_test = product_purchased_time["product_purchased_time"].iloc[[-1]]

regr = LinearRegression()
regr.fit(X_train, y_train)

y_pred = regr.predict(X_test.values.reshape(-1, 1))

print("Predicted sales for the future month:", y_pred[0])

prediction_df = pd.DataFrame(
    {"Product_Purchased_Time": X_test, "Predicted_Sales": y_pred}
)
prediction_df.to_csv("predicted_sales.csv", index=False)
