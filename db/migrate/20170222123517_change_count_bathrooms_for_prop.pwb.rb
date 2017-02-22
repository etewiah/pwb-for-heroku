# This migration comes from pwb (originally 20170222100759)
class ChangeCountBathroomsForProp < ActiveRecord::Migration[5.0]
  def change
    # below needed to support 1.5 bathrooms in US
    change_column :pwb_props, :count_bathrooms, :float
  end
end

