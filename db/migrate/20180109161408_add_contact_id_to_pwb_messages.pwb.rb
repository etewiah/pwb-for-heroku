# This migration comes from pwb (originally 20180109133855)
class AddContactIdToPwbMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :pwb_messages, :contact_id, :integer, index: true
  end
end
