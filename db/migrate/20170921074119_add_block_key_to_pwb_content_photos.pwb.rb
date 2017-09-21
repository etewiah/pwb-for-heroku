# This migration comes from pwb (originally 20170919134945)
class AddBlockKeyToPwbContentPhotos < ActiveRecord::Migration[5.1]
  def change
    add_column :pwb_content_photos, :block_key, :string, index: true
  end
end
