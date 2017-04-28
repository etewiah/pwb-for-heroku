# This migration comes from pwb (originally 20170428170615)
class ChangePropPricesToBigInt < ActiveRecord::Migration[5.0]
  def change
    change_column :pwb_props, :price_sale_current_cents, :integer, limit: 8
    change_column :pwb_props, :price_sale_original_cents, :integer, limit: 8
  end  
end
